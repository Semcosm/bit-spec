# Bit specification index

This page is the stable entry point for the repository. Links are grouped by the layer they describe; a document may reference a lower layer but must not silently redefine it.

## Normative specification

### Bit language

- [Language](spec/bit/language.md)
- [Semantics](spec/bit/semantics.md)
- [Type system](spec/bit/type-system.md)
- [Memory model](spec/bit/memory-model.md)
- [Concurrency](spec/bit/concurrency.md)
- [Module system](spec/bit/module-system.md)

### Bit intermediate representation (BIR)

- [Overview](spec/bir/overview.md)
- [Core model](spec/bir/core.md)
- [Types](spec/bir/types.md)
- [Operations](spec/bir/operations.md)
- [Regions](spec/bir/regions.md)
- [Memory](spec/bir/memory.md)
- [Verification](spec/bir/verification.md)

### Boundary specifications

- [ABI](spec/abi/README.md)
- [Runtime](spec/runtime/README.md)
- [Bootstrap](spec/bootstrap/README.md)

## Architecture and design

- [Architecture overview](architecture/overview.md)
- [Layers](architecture/layers.md)
- [Trust boundary](architecture/trust-boundary.md)
- [Compilation pipeline](architecture/compilation-pipeline.md)
- [Dependency model](architecture/dependency-model.md)
- [Goals](design/goals.md)
- [Non-goals](design/non-goals.md)
- [Principles](design/principles.md)
- [Invariants](design/invariants.md)
- [Constraints](design/constraints.md)

## How changes are governed

- [RFC process](rfcs/0000-rfc-process.md)
- [Accepted RFCs](rfcs/accepted/README.md)
- [Proposed RFCs](rfcs/proposed/README.md)
- [Rejected RFCs](rfcs/rejected/README.md)
- [Superseded RFCs](rfcs/superseded/README.md)
- [Decision records](decisions/README.md)

## Practical material

- [Guide overview](guides/overview.md)
- [Compiler guide](guides/compiler.md)
- [BIR guide](guides/bir.md)
- [Bootstrap guide](guides/bootstrap.md)
- [Glossary](glossary/terms.md)
- [Conformance](conformance/README.md)
- [History](history/README.md)
