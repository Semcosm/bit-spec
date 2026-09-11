# Invariants

**Status:** Normative draft; acceptance pending

The following invariants are shared by the language and BIR specifications:

1. A well-typed program does not perform an invalid access through a safe operation.
2. Every live owned value has exactly one responsible owner, or is governed by a documented shared capability.
3. A reference cannot outlive the region or allocation it references.
4. A data race cannot arise through safe concurrent operations.
5. Every control-flow edge has a valid destination and satisfies the destination's parameter types.
6. A module can observe only declarations made visible by its imports and visibility rules.
7. A verified BIR module has no unknown safety-relevant operation, type, region, or memory flag.
8. Observable behavior is independent of implementation-defined layout unless an ABI profile makes that layout part of the contract.

An accepted RFC that changes an invariant must update this page and the affected normative sections in the same change.
