# BIR verification

**Status:** Normative working draft; acceptance pending

Verification is a deterministic, fail-closed pass over a decoded module. It performs these checks in order:

1. profile and identifier validity;
2. type-table normalization and well-formedness;
3. operation schemas, operand/result types, and effect declarations;
4. control-flow reachability, dominance, and terminators;
5. ownership, borrow lifetimes, region captures, and cleanup paths;
6. memory bounds, alignment, aliasing, and atomic ordering;
7. call signatures, capabilities, and foreign ABI requirements.

The verifier MUST report a stable error code and the first offending operation or edge for each failed check. It MAY continue to collect independent errors, but it must not produce a verified artifact. Verification results include the module digest, BIR profile, verifier version, and capability set.

An optimizer or backend may run additional checks. Those checks are additive and cannot make an artifact appear verified under a weaker verifier. Reproducers should preserve the canonical textual form and the verifier profile.
