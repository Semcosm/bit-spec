# Glossary

**ABI** - Application binary interface: the contract for calling convention, representation, and ownership at a compiled boundary.

**BIR** - Bit Intermediate Representation, the typed and verifiable compiler-facing representation.

**Borrow** - A temporary reference to an owned value, governed by a lifetime and mutable-aliasing rules.

**Capability** - A named runtime or target service an artifact is allowed to use.

**Effect** - A declaration of observable work such as allocation, I/O, synchronization, or unsafe access.

**Lifetime** - The interval in which a reference or region remains valid.

**Module profile** - A versioned set of language, BIR, ABI, runtime, and feature choices used to interpret an artifact.

**Owner** - The value or scope responsible for releasing an allocation exactly once.

**Region** - A lifetime and control-flow boundary that governs captures, cleanup, and allocation validity.

**Safe** - Covered by the guarantees of the active language and runtime profile; not synonymous with bug-free or infallible.

**Task** - An independently scheduled computation with an ownership and cancellation boundary.

**Verifier** - The fail-closed checker that decides whether BIR satisfies the BIR profile's structural, typing, ownership, memory, and capability rules.
