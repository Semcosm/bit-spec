# Trust boundary

**Status:** Informative draft

The trusted computing base is deliberately small:

- the parser and name resolver establish source structure;
- the type checker establishes typing and effect information;
- the BIR verifier establishes representation invariants;
- the runtime and ABI implement only the capabilities they advertise.

Optimizers, code generators, packaging tools, and third-party front ends are not trusted to preserve safety. They must emit verifiable BIR. A verifier MUST fail closed: an unknown operation, type, flag, or metadata field that affects safety is an error, not an ignored hint.

Proof-carrying metadata is useful for diagnostics and optimization, but safety must be derivable from the BIR itself. Caches are not authority; a cache hit is valid only after the artifact identity and verifier version have been checked.

The boundary does not promise memory safety for foreign code. Foreign calls are unsafe by default and require an ABI declaration that identifies ownership, mutability, thread-safety, and failure behavior.
