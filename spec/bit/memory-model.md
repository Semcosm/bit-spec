# Bit memory model

**Status:** Normative working draft; acceptance pending

## Storage and regions

Each allocation belongs to a region. A region is either lexical (created for a block), owned (destroyed when its owner is dropped), shared (managed by the runtime), or foreign (controlled by an ABI boundary). Values stored in a region cannot contain a reference to a shorter-lived region. Region destruction runs each value's destructor exactly once in reverse construction order.

The implementation may place values in registers, stack slots, arenas, or a garbage-collected heap. Those choices are unobservable except through documented allocation effects, alignment, and ABI representation.

## Ownership operations

Creating an owning value establishes one owner. Moving transfers that responsibility and invalidates the source place. Dropping releases the owner; dropping a shared handle decrements its runtime-managed count. A destructor may access only values still valid at the point of destruction and may not resurrect the dropped allocation.

Borrowing creates a reference tied to a lifetime. During an immutable borrow, the referent cannot be mutated; during a mutable borrow, no other access is permitted. Non-lexical lifetime analysis may end a borrow at its last use, but an implementation must preserve the same safety guarantee.

## Access and bounds

An index operation checks bounds before accessing an element. A slice carries a pointer and length as one value; constructing a slice requires that the pointer range is valid for the stated length and alignment. Safe code cannot forge a slice or dereference a null, dangling, or misaligned reference.

## Unsafe and foreign memory

Raw pointers and foreign handles are available only in `unsafe` code or in an ABI adapter whose contract proves validity. An unsafe block must document the preconditions it relies on. Violating those preconditions forfeits safe-language guarantees but must not silently make surrounding safe code unverifiable.

## Atomics and visibility

Ordinary reads and writes are not synchronization operations. Shared mutable state must use the atomic or lock primitives specified by the [concurrency](concurrency.md) and runtime profiles. A data race on a location that is not explicitly synchronized is a panic or trap in checked runtimes and is outside safe-language behavior in unchecked runtimes.
