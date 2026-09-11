# Dependency model

**Status:** Informative draft

Bit dependencies are explicit module imports. A module identity consists of its declared name, source digest, compiler profile, and the identities of direct imports. Generated BIR and target artifacts inherit that identity.

Implementations SHOULD use content-addressed records. At minimum, a cache key MUST include:

- the source and imported-module digests;
- the language/BIR specification revision;
- target, ABI, and runtime profiles;
- enabled feature and capability flags.

Dependency resolution must be deterministic for a lockfile or equivalent manifest. Network access, wall-clock time, environment variables, and host file paths MUST NOT affect a reproducible build unless they are declared inputs. Cycles are rejected during module resolution except where an accepted module-system extension defines a fixed-point rule.
