# Bootstrap guide

**Status:** Informative draft

Bootstrap work should begin with the smallest parser and verifier that can process a fixed, documented subset. Keep the subset explicit in a profile manifest and make unsupported constructs fail with stable diagnostics. Use a host implementation only to seed the first executable; do not treat host behavior as a language rule.

Record each bootstrap stage's inputs, tool versions, profile identifiers, and canonical BIR digest. Compare a newly built stage with the previous stage using conformance fixtures and artifact metadata. Differences must be explained by an accepted change or a named implementation bug.
