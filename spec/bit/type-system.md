# Bit type system

**Status:** Normative working draft; acceptance pending

## Type categories

The built-in types are `bool`, signed and unsigned integers (`i8` through `i128`, `u8` through `u128`), `f32`, `f64`, `char`, `text`, `()`, and `never`. Compound types are tuples `(T, U)`, arrays `[T; N]`, slices `slice<T>`, functions `fn(A) -> R`, and user-defined `struct` and `enum` types.

`Option<T>` and `Result<T, E>` are standard library types, not compiler magic. A profile may provide layout optimizations for them without changing their source semantics.

## Ownership and references

Every value has an ownership mode: `own T` (unique ownership), `share T` (shareable ownership governed by the runtime), or a borrowed reference `&'r T` / `&'r mut T`. The lifetime `'r` names a lexical or region lifetime. A mutable reference is exclusive for its lifetime; no immutable or second mutable reference to the same place may overlap it.

Passing an `own T` moves the value unless the type is explicitly `Copy`. Using a moved value is a type error. Borrowing does not transfer ownership, and a borrow cannot outlive the owner. The [memory model](memory-model.md) gives the operational rules.

## Declarations and inference

Local `let` bindings are immutable by default; `var` bindings may be reassigned. The compiler infers omitted local types using constraints from initializers and uses. Public signatures MUST spell out all types that cross a module boundary. Inference never guesses between numerically distinct types: an unsuffixed integer literal is resolved from context or reported as ambiguous.

## Generics and constraints

Functions and types may have type parameters: `fn first<T>(x: slice<T>) -> Option<T>`. A parameter constraint uses a trait-like bound (`T: Eq + Send`). The initial predeclared constraints are `Copy`, `Eq`, `Ord`, `Send`, and `Sync`. Constraint implementation and coherence rules are profile-defined but must be deterministic; two modules cannot provide conflicting implementations for the same external type and constraint.

## Conversion

Conversions that can lose information are explicit (`as i32`, checked conversion, or a named constructor). Widening integer conversion and borrow requalification may be implicit when unambiguous. Pointer, function, and foreign-handle conversions are never implicit. A failed checked conversion returns a `Result` rather than silently wrapping.

## Type equality and aliases

Two types are equal when they have the same normalized structure and parameters. `type Name = Existing` creates an alias and does not create a new runtime type. A distinct wrapper requires a `struct` declaration. Recursive types must pass through an owning indirection such as `Box<T>` or a runtime handle.

## Type errors

An implementation MUST reject a program with an unsatisfied constraint, invalid move or borrow, inaccessible declaration, non-exhaustive match, incompatible branch types, or an effect not declared by the enclosing function. Diagnostics should identify the smallest expression that introduces the mismatch.
