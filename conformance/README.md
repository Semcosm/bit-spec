# Conformance

**Status:** Conformance plan; fixtures pending

Conformance fixtures are executable examples and expected diagnostics for a named language, BIR, ABI, or runtime profile. A fixture must identify its input, expected result, profile, and the invariant or rule it exercises.

The conformance suite should cover accepted programs, rejected programs, panic/trap behavior, ownership and lifetime errors, concurrency constraints, malformed BIR, and capability mismatches. Passing a suite demonstrates conformance to that suite and profile; it does not grant permission to infer unspecified behavior.

## Fixture format

Each fixture should have a stable identifier and record:

- the profile and specification revision;
- source or BIR input and its expected canonical digest when applicable;
- accepted output, rejection class, diagnostic code, or trap behavior;
- the invariant, boundary rule, or capability it exercises.

Fixtures must be deterministic. They must not depend on wall-clock time, host paths, network access, or unspecified layout. A runner should distinguish a wrong result from an unsupported profile and report both the fixture ID and governing rule.

## Coverage plan

The initial suite should include:

1. accepted language programs for parsing, typing, ownership, memory, modules, and concurrency;
2. rejected programs for invalid access, lifetime escape, data races, and visibility errors;
3. valid and malformed BIR for control flow, types, effects, regions, and memory;
4. ABI layout and ownership cases, runtime capability failures, and bootstrap stage comparisons.

There are no executable fixtures yet. The first accepted profile must land its fixtures in the same change as the normative rules it tests.
