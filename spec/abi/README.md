# Application binary interface (ABI)

**Status:** Boundary specification placeholder; acceptance pending

The ABI contract defines how verified BIR types and calls cross into generated code, foreign code, and separately compiled modules. A concrete ABI profile must specify calling convention, scalar and aggregate layout, alignment, endianness, symbol naming, panic/unwind behavior, and ownership transfer at each boundary.

No default platform ABI is normative yet. Implementations must select and record a named profile rather than assuming that the host C ABI is the Bit ABI. See the [architecture layers](../../architecture/layers.md) for the boundary rules.
