# Bit semantics

**Status:** Normative working draft; acceptance pending

## Evaluation

Bit evaluates expressions in source order, from left to right. A function call evaluates its callee, then each argument, then enters the callee. A binding initializer is evaluated before the binding becomes visible. This ordering is observable through effects, traps, and concurrency operations.

Values are immutable unless a mutable binding or mutable reference is explicitly used. Assignment changes the storage denoted by a mutable place; it does not change the identity of an owned value. Reading an uninitialized or moved place is a compile-time error where it can be proven and a verifier error in BIR otherwise.

## Effects

Functions declare an effect set after their return type, for example `fn read() -> i32 effects {io}`. An omitted set means `{pure}`. The initial effect names are `pure`, `alloc`, `io`, `async`, and `unsafe`; an effect is transitive through calls. A caller MUST declare every effect it may perform. `unsafe` is never inferred away and requires an `unsafe` block at the source boundary.

Effects constrain optimization, not typing: a pure function may still diverge or fail due to an explicitly documented precondition, but it cannot perform I/O, access ambient mutable state, or observe scheduling.

## Control flow

`if`, `match`, and loops are expressions. `return` exits the nearest function; `break` exits the nearest loop and may carry a value when the loop is used as an expression. A function that reaches its end must produce a value of its declared return type. Non-terminating functions may use the bottom type `never`.

Pattern matching is exhaustive. An unmatched pattern is a compile-time error; there is no implicit fall-through. `match` evaluates its scrutinee once and tests arms in source order.

## Failure and panic

Recoverable failure is represented by a result type such as `Result<T, E>`. A panic is an unrecoverable failure of the current task and carries a panic payload and source location. Implementations MUST NOT turn a panic into a successful return. Whether a task panic terminates a process or is isolated is a runtime-profile choice, but it must be documented by that profile.

Integer overflow is a panic in checked profiles. Wrapping arithmetic is available through explicitly named operations (`wrapping_add`, and so on). Division by zero, invalid shifts, failed bounds checks, and violated runtime preconditions panic unless an operation's contract says otherwise.

## Equality, identity, and representation

`==` compares values according to their type. It does not compare object identity or pointer addresses. Identity comparison, when supported by a runtime profile, is an unsafe operation. The source language cannot observe padding bytes, object addresses, or a particular field layout unless an ABI declaration opts into that representation.

## Undefined behavior

Safe Bit has no undefined behavior. An operation outside its preconditions is rejected statically when possible or produces a specified panic/trap. Undefined behavior may occur only inside an explicitly marked unsafe operation and is then outside the guarantees of the language profile.
