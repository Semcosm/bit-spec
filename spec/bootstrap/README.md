# Bootstrap

**Status:** Boundary specification placeholder; acceptance pending

Bootstrap defines the smallest toolchain that can parse, verify, and execute or lower a self-hosting subset of Bit. A bootstrap artifact must identify its source, BIR, ABI, and runtime profiles and must be reproducible from documented inputs.

The bootstrap compiler may implement a strict subset, but it must reject unsupported syntax and effects explicitly. Once a later-stage compiler is available, equivalence is established by comparing canonical BIR and conformance results rather than by trusting executable output alone.
