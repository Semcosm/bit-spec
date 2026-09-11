# Bit concurrency

**Status:** Normative working draft; acceptance pending

## Tasks

A task is an independently scheduled computation. `spawn` creates a task and transfers captured `own` values or requires captured values to satisfy `Send`. A task handle can be joined once; joining observes either the returned value or the task's panic. A task that is abandoned is cancelled according to the runtime profile and must release its owned values.

## Communication

The preferred communication primitive is a typed channel, `chan<T>`. Sending moves an `own T` into the channel; receiving moves it to the receiver. A bounded channel may suspend the sender when full. Closing a channel is idempotent and causes subsequent receives to return an end-of-stream result. Implementations must define whether cancellation wakes blocked operations; the base profile requires it.

Shared state may use `Mutex<T>`, `RwLock<T>`, or atomic types supplied by the runtime. A guard returned by a lock keeps the protected borrow alive until the guard is dropped. Lock acquisition order and poisoning behavior are runtime-profile details, but a safe operation must not expose a data race.

## Memory ordering

Atomic operations accept one of `relaxed`, `acquire`, `release`, `acq_rel`, or `seq_cst`. An implementation MUST implement at least the ordering guarantees named by the operation and MUST reject an ordering that is invalid for that operation (for example, `release` on a pure load). The base profile follows the language's target memory model and documents any stronger guarantees.

## Cancellation and failure

Cancellation is cooperative. A cancellation request sets a task flag and wakes cancellation points such as channel, lock, and I/O waits. Code may defer cancellation only inside a bounded cleanup region. Panics do not automatically cancel unrelated tasks; structured task groups may opt into sibling cancellation.

## Safety boundary

Values crossing a task or channel boundary must be `Send`; values accessed concurrently through shared references must be `Sync`. These constraints are checked at compile time and repeated by BIR verification for generated task and channel operations.
