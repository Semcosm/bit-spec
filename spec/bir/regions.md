# BIR regions

**Status:** Normative working draft; acceptance pending

A region is a control-flow graph with an entry block, zero or more nested regions, and a declared set of captured values. Blocks belong to exactly one region. A nested region may capture an immutable value or an explicitly transferred owner; it may not capture a borrow whose lifetime ends before the nested region.

Structured operations such as `if`, `loop`, `match`, task bodies, and cleanup scopes own nested regions. Their region arguments and yields are explicit. The verifier checks that every region has a well-typed exit and that all exits agree on yielded types.

Dominance is computed within each region. A value defined in a parent region dominates uses in a child region when it is captured; a child value cannot escape without an explicit yield. Unreachable blocks are invalid unless marked by `unreachable` and retained for diagnostics.

Cleanup regions run on every exit path, including panic and cancellation, in reverse nesting order. Lowering may flatten regions only after preserving those cleanup edges.
