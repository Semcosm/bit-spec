# BIR core

**Status:** Normative working draft; acceptance pending

## Module and identifiers

A BIR module has a unique module identifier, a BIR profile, a type table, zero or more global declarations, and zero or more function declarations. Identifiers are local to their table and are never inferred from textual names. References to an unknown identifier are verification errors.

## SSA values and blocks

BIR uses static single assignment (SSA) values. Each value has one defining operation or block parameter and may have many uses. A block has zero or more typed parameters, a sequence of operations, and one terminating operation. A value cannot be used before its definition or outside the region that dominates its use.

## Terminators

The base terminators are `return`, `br`, `cond_br`, `switch`, `unreachable`, and `panic`. A terminator consumes all control flow from its block. Branch arguments must match destination block parameters exactly after profile-defined type normalization.

## Effects and attributes

Operations declare their effects (`pure`, `read`, `write`, `alloc`, `io`, `sync`, `unsafe`, or `terminator`). Attributes are key/value records with profile-defined schemas. Safety-relevant attributes are closed-world: unknown keys or values are rejected. Debug attributes may be dropped without affecting validity.

## Determinism

The textual form is canonicalized by sorting tables by identifier and attributes by key, while preserving operation and block order. Equivalent encodings must decode to the same module digest.
