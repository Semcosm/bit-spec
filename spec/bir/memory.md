# BIR memory

**Status:** Normative working draft; acceptance pending

BIR makes memory effects and ownership transitions explicit. An `alloc` operation creates a region-bound allocation; `load` and `store` carry the reference or place type, alignment requirement, and mutability. `borrow` produces a lifetime-tagged reference, and `drop` ends ownership.

Each memory operation is classified as pure, read, write, alloc, or unsafe. The verifier rejects a write through an immutable reference, a load after drop, overlapping mutable borrows, invalid alignment, and a region escape. Alias metadata can improve optimization but cannot override the ownership graph.

Atomic and lock operations include memory-ordering attributes. A backend may strengthen an ordering but may not weaken it. Foreign memory is represented by a foreign region and can be touched only by operations whose ABI declaration supplies validity and synchronization guarantees.
