# Application binary interface (ABI)

**Status:** Boundary specification working draft; acceptance pending

The ABI contract defines how verified BIR types and calls cross into generated code, foreign code, and separately compiled modules. A concrete ABI profile must specify calling convention, scalar and aggregate layout, alignment, endianness, symbol naming, panic/unwind behavior, and ownership transfer at each boundary.

## Current contract

Until a profile is accepted, implementations MUST treat the ABI as an explicit input rather than infer it from the host C ABI. Every generated artifact should record:

- the ABI profile identifier and version;
- target endianness, pointer width, alignment, and aggregate layout;
- symbol naming and visibility rules;
- ownership, mutability, thread-safety, and failure behavior for foreign calls.

Verified BIR is the only input to an ABI lowering stage. The backend may reject a valid module when a target lacks a required capability, but it MUST NOT reinterpret source-level ownership or lifetime rules.

## Profile checklist

A future accepted profile must define scalar representations, aggregate passing and return, alignment and padding, variadic calls, unwind or panic boundaries, thread-local state, and the representation of opaque handles. It must also provide positive and negative conformance fixtures for each rule.

## Open work

No default platform ABI is normative yet. The first profile should be deliberately small, document its relationship to the host ABI, and specify how incompatible layouts fail during linking or module loading.

No default platform ABI is normative yet. Implementations must select and record a named profile rather than assuming that the host C ABI is the Bit ABI. See the [architecture layers](../../architecture/layers.md) for the boundary rules.
