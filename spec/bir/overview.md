# BIR overview

**Status:** Normative working draft; acceptance pending

Bit Intermediate Representation (BIR) is a typed, region-based representation exchanged between front ends, verifiers, optimizers, and backends. It is not a source language and has no implicit evaluation order: every effectful dependency is represented by an operation edge or by the order of operations in a block.

The canonical BIR module contains a profile header, type table, declarations, region bodies, and optional debug metadata. A producer may emit a textual or binary encoding, but the decoded graph must be identical. BIR versions are independent of source-language versions and are recorded in every artifact.

The verifier is the authority for BIR validity. A backend may reject valid BIR when its target profile lacks a capability, but it must never accept invalid BIR. The remaining BIR documents define the graph, types, operations, regions, memory effects, and verification rules.
