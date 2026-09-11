# Bit module system

**Status:** Normative working draft; acceptance pending

## Names and visibility

A module name is a dotted path. Its declarations form one namespace per kind (types, values, and modules); a declaration cannot shadow another declaration of the same kind in one scope. `pub` exports a declaration, while private declarations are visible only within their defining module and its nested scopes.

Imports are explicit and may be renamed with `as`. An import does not re-export a name unless the importing module declares a public alias. Unused imports are warnings by default and errors in strict profiles.

## Resolution

The resolver maps a module path to exactly one source or precompiled artifact under the active package manifest. Implementations MUST reject ambiguous paths, duplicate module identities, and imports that escape the package root. Resolution is deterministic and must not execute build scripts as part of name lookup.

## Initialization

Module-level `const` values are compile-time evaluated. A module-level initializer with an `alloc`, `io`, or `async` effect is not permitted in the base profile. If a profile enables runtime initialization, dependencies are initialized in topological order and cycles are a load-time error with a stable diagnostic.

## Generics and interface boundaries

Generic declarations are instantiated only after visibility and constraint checking. Public generic signatures expose their constraints as part of the module interface. A compiled interface records declaration names, normalized types, effects, constraints, ABI attributes, and the language/BIR profile.

## Versioning and compatibility

An import may specify a required interface version. A provider can add private declarations freely and can add public declarations under a minor-compatible profile, but changing a public type, effect, constraint, or ABI attribute is a breaking change unless an accepted compatibility rule says otherwise. The [dependency model](../../architecture/dependency-model.md) defines artifact identity.
