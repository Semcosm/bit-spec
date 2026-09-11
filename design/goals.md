# Design goals

**Status:** Informative draft

Bit is designed to provide:

- predictable semantics suitable for ahead-of-time and incremental compilation;
- memory safety by default, with narrow and visible unsafe boundaries;
- a compact intermediate representation that can be independently verified;
- explicit resource ownership and concurrency communication;
- portable source behavior across targets with different ABIs;
- reproducible builds and inspectable compatibility decisions.

These goals apply together. For example, portability does not justify hiding target-dependent layout, and performance does not justify accepting unverified BIR.
