# Compilation pipeline

**Status:** Informative draft

An implementation MAY combine stages, but the observable contracts are ordered as follows:

1. **Decode** source bytes as UTF-8 and report source locations.
2. **Parse** a module into an unambiguous syntax tree.
3. **Resolve** imports, names, and declarations without executing user code.
4. **Elaborate** syntax into a typed, effect-annotated form.
5. **Lower** the elaborated form to canonical BIR.
6. **Verify** BIR, including regions, types, memory, and control flow.
7. **Optimize** only through transformations that preserve verification and semantics.
8. **Lower** to the selected ABI and target.
9. **Link/package** code with declared runtime capabilities and reproducible metadata.

Each stage consumes a complete artifact and either produces the next artifact or diagnostics. A compiler MUST NOT emit a successful build result after a failed verification step. Incremental implementations may reuse prior results only when all dependency identities and relevant configuration are unchanged; see the [dependency model](dependency-model.md).
