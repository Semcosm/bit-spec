# Architecture layers

**Status:** Informative draft

The repository uses the following layers, from least target-specific to most target-specific:

| Layer | Primary artifact | Governing material |
| --- | --- | --- |
| Source | Bit modules | `spec/bit/` |
| Typed IR | BIR modules and region graphs | `spec/bir/` |
| Boundary | Calling convention and data layout | `spec/abi/` |
| Execution | Allocation, scheduling, and services | `spec/runtime/` |
| Delivery | Minimal compiler/runtime seed | `spec/bootstrap/` |

Language rules are independent of the backend and runtime. BIR makes the parts needed for verification explicit, but it does not become a second source language. The ABI describes representation at an external boundary; it must not be used to infer source-level aliasing or lifetime rules. Runtime services implement specified behavior and may offer extensions only behind an explicit capability.

When layers disagree, the higher-level contract wins unless an accepted RFC explicitly changes it. A layer may reject an input it cannot support, but it may not reinterpret valid input in a way that changes observable language behavior.
