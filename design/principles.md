# Design principles

**Status:** Informative draft

1. **Make invalid states unrepresentable.** Encode ownership, effects, and control-flow facts where the verifier can inspect them.
2. **Prefer explicit boundaries.** Cross-module, foreign, unsafe, and target-specific behavior is declared at the boundary that introduces it.
3. **Specify observable behavior.** Leave optimization freedom only where a program cannot distinguish the choice.
4. **Fail closed.** Unknown safety-relevant data is rejected.
5. **Keep the core small.** Add a primitive only when it simplifies a common proof or boundary.
6. **Version contracts, not accidents.** Compatibility follows accepted documents and profiles, not one implementation's current output.
