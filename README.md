# Bit specification

Bit is a small, portable systems language and its verified intermediate representation (BIR). This repository is the source of truth for the language contract: syntax, semantics, types, memory, concurrency, modules, the compiler pipeline, and the interfaces required by runtimes and bootstrappers.

The specification is intentionally layered. Normative language and BIR rules live under [`spec/`](spec/); design rationale and implementation boundaries live under [`design/`](design/) and [`architecture/`](architecture/). Guides explain how to use the documents without changing their meaning.

## Status

This repository is a working draft. A document is normative only when it says so in its **Status** section and has been accepted through the process in [`rfcs/0000-rfc-process.md`](rfcs/0000-rfc-process.md). Unspecified behavior must not be inferred from an implementation.

The keywords **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are used as described in RFC 2119/8174 when they appear in uppercase.

## Start here

- [Index](INDEX.md) - the canonical map of the repository.
- [Language overview](spec/bit/language.md) - source language boundaries and notation.
- [BIR overview](spec/bir/overview.md) - the compiler-facing representation.
- [Architecture overview](architecture/overview.md) - trust boundaries and data flow.
- [Design goals](design/goals.md) - the constraints that guide changes.
- [Contributor guide](guides/overview.md) - how to read and propose changes.

## Contributing

Small clarifications can be proposed as a pull request. Changes to a normative rule, an invariant, or a compatibility promise MUST use an RFC. Keep examples executable in spirit: state assumptions, identify undefined behavior, and link each claim to the governing section. See the [RFC process](rfcs/0000-rfc-process.md) for review, acceptance, and supersession rules.

## Documentation website

The [Docusaurus site](website/README.md) reads these Markdown files directly. Push changes to `main` or `master` and [GitHub Actions](.github/workflows/deploy-pages.yml) will install the website dependencies, build the static site, and deploy it to GitHub Pages. Local Node.js or local builds are not required. Enable **Settings > Pages > Source > GitHub Actions** once in the repository settings.

## License

No license has been selected for this draft yet. Treat the contents as project material and do not redistribute them as a public standard until a license decision is recorded in `decisions/`.
