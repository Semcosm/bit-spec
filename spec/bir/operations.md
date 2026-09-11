# BIR operations

**Status:** Normative working draft; acceptance pending

An operation has an opcode, zero or more operands, zero or more result IDs, an effect set, and attributes. The base operation families are:

| Family | Examples | Required checks |
| --- | --- | --- |
| Values | `const`, `tuple`, `extract` | literal and result types |
| Arithmetic | `add`, `sub`, `mul`, `div`, `cmp` | operand types and overflow mode |
| Ownership | `move`, `borrow`, `drop`, `clone` | place state and lifetimes |
| Memory | `alloc`, `load`, `store`, `index` | region, alignment, and bounds facts |
| Calls | `call`, `invoke`, `foreign_call` | signature, effects, and ABI |
| Control | `return`, `br`, `cond_br`, `switch`, `panic` | terminator and edge types |
| Concurrency | `spawn`, `send`, `recv`, `lock`, `atomic` | `Send`/`Sync` and ordering |

An opcode's semantics are defined by its profile. Producers must not encode a semantically different operation under a familiar opcode. Operations with a potentially trapping precondition carry an explicit checked or unchecked mode; unchecked modes require `unsafe` and a proof attribute recognized by the verifier.

Optimization passes may replace operations only when the replacement has a subset of the original effects and preserves all observable traps, ownership transitions, and synchronization edges.
