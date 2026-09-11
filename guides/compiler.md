# Compiler guide

**Status:** Informative draft

Start by selecting a language profile and a target profile. Decode source as UTF-8, parse the module, resolve imports against a lockfile, and type-check with the profile's effect and ownership rules. Emit diagnostics before attempting code generation.

Lower the checked program to canonical BIR, run the verifier, and retain the verifier result with the artifact. Optimization should be staged after verification and followed by verification again. A backend then selects an ABI and runtime capability set and records both in the output metadata.

For a debugging session, compare artifacts in this order: source digest, resolved dependency identities, typed form, canonical BIR, verifier result, target/ABI profile, and runtime capabilities. A difference at an earlier stage is usually more informative than an assembly diff.
