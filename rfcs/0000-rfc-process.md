# RFC process

**Status:** Normative process draft

An RFC is required for a change that affects source syntax or semantics, BIR validity, a shared invariant, a public ABI/runtime promise, or compatibility between profiles. Editorial fixes and clarifications that do not change a reasonable implementation may use an ordinary pull request, but the change must say why it is non-normative.

## Lifecycle

1. Copy the template into `rfcs/proposed/NNNN-short-name.md` and state the problem, proposal, alternatives, compatibility impact, security impact, and conformance tests.
2. Reviewers check the affected specifications, invariants, examples, and migration story. The author records unresolved questions rather than hiding them in implementation notes.
3. A proposal is accepted only when the required owners approve it and the repository contains updates to all affected normative documents and tests. Move it to `rfcs/accepted/` and record the decision in `decisions/`.
4. A rejected proposal is moved to `rfcs/rejected/` with the reason. It may be resubmitted with a new number after addressing that reason.
5. A later RFC may supersede an accepted RFC only by naming it, explaining the compatibility impact, and moving the older record to `rfcs/superseded/`.

RFC numbers are never reused. A title and status header are mandatory. Accepted RFCs take effect at the profile version named in the RFC; they do not silently change an older profile.

## Review standard

Review must consider behavior, diagnostics, verification, target boundaries, and documentation. A proposal that cannot be independently tested is incomplete. Security-sensitive changes require an explicit threat model and a statement of what remains outside the trust boundary.

## Template

```markdown
# RFC NNNN: Title

**Status:** Proposed
**Authors:**
**Target profile:**

## Summary
## Motivation
## Proposal
## Alternatives
## Compatibility and migration
## Security and trust impact
## Specification changes
## Conformance tests
## Open questions
```
