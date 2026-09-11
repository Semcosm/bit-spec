# Constraints

**Status:** Informative draft

The first implementation is constrained by a small team, multiple host platforms, and a need to bootstrap without trusting a large toolchain. Documents therefore favor:

- text formats that can be inspected and diffed;
- deterministic algorithms over host-specific heuristics;
- explicit version and capability fields;
- independently testable verifier rules;
- graceful rejection of features that a target profile cannot provide.

These constraints may be relaxed only through a decision or RFC that records the portability, security, and maintenance costs.
