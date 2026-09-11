# Architecture overview

**Status:** Informative draft

Bit is organized as a sequence of contracts rather than a single trusted compiler. Source text is parsed and elaborated into BIR, BIR is verified, and a target backend lowers verified BIR to an ABI and runtime. Each boundary has an explicit input, output, and failure mode.

```text
source -> parser/elaborator -> typed BIR -> verifier -> backend -> ABI/runtime
             |                    |            |
             +-- diagnostics      +-- proofs    +-- target-specific code
```

The front end may reject a program for syntax, name, or type errors. The verifier may reject malformed or unsafe BIR even when it was not produced by the reference compiler. A backend may reject a valid module when its target profile lacks a required capability; it must not weaken language rules to make code compile.

The architecture has three goals:

1. Make the smallest possible component trusted.
2. Keep target-specific choices out of source-language semantics.
3. Make artifacts inspectable and reproducible across implementations.

See [layers](layers.md), [trust boundary](trust-boundary.md), and the [compilation pipeline](compilation-pipeline.md) for the detailed contracts.
