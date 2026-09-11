# BIR types

**Status:** Normative working draft; acceptance pending

BIR types are explicit and normalized before verification. Primitive types are `unit`, `bool`, `iN`, `uN`, `f32`, `f64`, `char`, and `never`. Compound types include tuples, fixed arrays, slices, function signatures, nominal structs/enums, owned handles, borrowed references, and raw pointers.

Every reference type carries an ownership mode and region identifier. A function type carries parameter types, result type, effects, and calling convention. Nominal types refer to a declaration ID; structural equality must not conflate two distinct nominal declarations.

Type aliases are expanded in the verifier's normalization pass. Recursive type definitions must include an indirection. A type table is acyclic after aliases are expanded, except for explicitly recursive nominal declarations.

The verifier checks that operation operands and results have exactly the declared types. Implicit source conversions must already have been lowered to explicit BIR conversion operations.
