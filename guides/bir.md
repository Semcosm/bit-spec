# BIR guide

**Status:** Informative draft

Read a BIR module from its profile header, then inspect the type table and declaration signatures before reading operations. For each region, identify the entry block, block parameters, dominance relationships, and terminators. Ownership and memory operations should be read as a sequence of state transitions: allocate, initialize, borrow or move, use, and drop.

When reviewing a transformation, check that it preserves operation effects, trap behavior, region cleanup, and synchronization order. Re-run the verifier after every transformation. A textual BIR dump is useful for review, but the module digest and profile are the authority for reproducibility.
