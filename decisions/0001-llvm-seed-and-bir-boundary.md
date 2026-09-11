# Decision 0001: LLVM seed and BIR boundary

**Status:** Decided architecture direction; normative RFC acceptance pending
**Date:** 2026-09-11

## Context

Bit is intended to be a low-level systems language whose source semantics are
defined by Bit itself. LLVM IR is the first implementation substrate and the
initial source of multi-target code generation, but it must not define Bit
semantics. BIR exists only if it provides a real semantic, verification, and
infrastructure boundary between Bit and LLVM/MLIR.

## Decisions

### Seed compiler responsibilities — DECIDED

The first seed compiler has two translation responsibilities with a mandatory
verification checkpoint between them:

```text
Bit-B0 source -> Bit frontend/elaborator -> canonical BIR-B0
              -> BIR verification -> LLVM IR
```

The verifier may be part of the same executable and does not have to be a
separate LLVM IR module or process. Physical process separation is not the
boundary requirement; the canonical BIR artifact and its verification step are.

The LLVM backend MUST consume BIR that has passed verification. A frontend MUST
NOT bypass the BIR representation merely because all stages are in one process.

### LLVM IR implementation of Stage0 — DECIDED

The core of Stage0 may be written directly in LLVM IR, including the minimal
frontend, BIR construction/serialization, verifier, and BIR-to-LLVM lowering.
LLVM IR is the implementation language of the seed, not the semantic authority
for Bit.

Stage0 is expected to support an explicitly bounded `Bit-B0` and `BIR-B0`
profile. It is not required to implement the complete Bit language.

### BIR-B0 scope — DECIDED / OPEN

BIR-B0 MUST be minimal and semantically complete for the supported Bit-B0
profile. Every observable behavior admitted by Bit-B0, including values,
control flow, memory/ownership transitions, effects, and specified failure,
must have an explicit BIR representation and verifier rule.

The concrete opcode set, encoding, effect model, and exact Bit-B0 source subset
remain OPEN. Unsupported features MUST be rejected explicitly and
deterministically.

### Reference interpreter — PROPOSED

A BIR-B0 reference interpreter is strongly recommended as an independent
semantic oracle. It should be usable to compare BIR execution with the LLVM
lowering for values, traps/panics, cleanup, ownership, effects, and ordering.

Whether the interpreter is required for the first bootstrap milestone, how
independent its implementation must be, and whether a Bit-source interpreter is
also needed remain OPEN.

### LLVM-direct bootstrap path — DECIDED

Stage0 MAY temporarily provide a direct path:

```text
Bit-B0 source -> LLVM IR
```

This is a bootstrap shortcut, not the normative compilation path. It MUST NOT
make LLVM behavior the definition of Bit, introduce LLVM poison/undef/UB as Bit
semantics, or bypass verification in the BIR-first path.

The BIR-first path should become the default once Stage1 can produce verified
canonical BIR. The exact exit criterion for the shortcut remains OPEN.

### Non-LLVM backends — DECIDED for current scope

No non-LLVM backend is required for the initial seed or BIR-B0 milestone.
Future backends remain permitted and are a later engineering validation of the
BIR decoupling claim, not a prerequisite for bootstrap.

## Consequences

- Stage0 can be bootstrapped from LLVM tooling without requiring a C or C++
  compiler as the implementation language of the seed.
- BIR must be a real, inspectable data boundary rather than an in-memory name
  for compiler internals.
- The initial verifier and frontend remain part of the early trust boundary;
  BIR verification alone does not prove that source-to-BIR elaboration is
  semantically correct.
- LLVM version, target, and ABI assumptions must be pinned and recorded for
  reproducibility. They remain implementation dependencies.
- Keeping BIR-B0 small limits the first bootstrap scope, while semantic
  completeness prevents unsupported behavior from being silently invented.

## Rejected alternatives

- Treating LLVM IR as the Bit language specification.
- Making the verifier optional because frontend, verifier, and backend share one
  executable.
- Defining BIR as a temporary AST-to-LLVM organization layer.
- Requiring a second backend before the first self-hosting milestone.
- Treating successful self-compilation as proof of compiler correctness.

## Follow-up RFCs

The following items require separate RFCs or decision records before becoming
normative contracts:

1. Bit-B0 and BIR-B0 scope, opcode schemas, and canonical encoding.
2. BIR verification obligations and the source-to-BIR semantic relation.
3. Reference interpreter requirements and differential conformance.
4. LLVM-direct shortcut exit criteria and LLVM lowering restrictions.
5. Bootstrap reproducibility, trust assumptions, and self-hosting milestones.
