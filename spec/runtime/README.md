# Runtime

**Status:** Boundary specification placeholder; acceptance pending

The runtime contract covers allocation, task scheduling, channels, locks, atomics, I/O handles, time, cancellation, and panic handling. A runtime profile advertises capabilities and their failure behavior; code may use only capabilities listed in its module metadata.

The base language does not require a particular allocator, garbage collector, scheduler, or operating-system API. Until a profile is accepted, runtime behavior described in the language documents is the semantic minimum, not an implementation prescription.
