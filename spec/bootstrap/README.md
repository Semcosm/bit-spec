# Bootstrap

**Status:** Boundary specification working draft; acceptance pending

Bootstrap defines the smallest toolchain that can parse, verify, and execute or lower a self-hosting subset of Bit. A bootstrap artifact must identify its source, BIR, ABI, and runtime profiles and must be reproducible from documented inputs.

The bootstrap compiler may implement a strict subset, but it must reject unsupported syntax and effects explicitly. Once a later-stage compiler is available, equivalence is established by comparing canonical BIR and conformance results rather than by trusting executable output alone.

## Bootstrap stages

Each stage records its source digest, toolchain versions, language/BIR/ABI/runtime profiles, canonical BIR digest, and conformance results. A stage may use a host implementation to produce the next executable, but the host is not a language authority.

The minimum useful seed pipeline is:

1. decode a fixed UTF-8 source subset and emit stable diagnostics;
2. parse and elaborate that subset into canonical BIR;
3. verify BIR before any target lowering;
4. lower verified BIR through the selected ABI and runtime profile.

Unsupported syntax, effects, targets, and capabilities MUST fail explicitly. A successful build result MUST NOT be emitted after a verification failure.

## Equivalence checks

When a later stage is available, compare canonical BIR, verifier results, profile metadata, and conformance outcomes. Differences require an accepted specification change or a named implementation bug. Executable output alone is not evidence of bootstrap equivalence.

## Open work

The first accepted bootstrap profile should define the Bit-B0 and BIR-B0 subsets, reproducible tool versions, artifact metadata, and the minimum fixture set needed to compare stages.
