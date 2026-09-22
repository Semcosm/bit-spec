# Runtime

**Status:** Boundary specification working draft; acceptance pending

The runtime contract covers allocation, task scheduling, channels, locks, atomics, I/O handles, time, cancellation, and panic handling. A runtime profile advertises capabilities and their failure behavior; code may use only capabilities listed in its module metadata.

## Current contract

Runtime behavior is exposed as named capabilities. A compiled module MUST record the runtime profile and the capabilities it requires. A runtime MUST reject an unavailable or incompatible capability instead of silently substituting behavior.

The base contract requires each profile to document:

- allocation and deallocation failure behavior;
- task, channel, lock, and atomic progress and ordering guarantees;
- I/O handle ownership and shutdown behavior;
- time source, cancellation, and panic or trap propagation.

Concurrency operations must preserve the language and BIR rules. A scheduler or allocator is an implementation choice only when it cannot change observable ordering, ownership, failure, or synchronization behavior.

## Profile checklist

An accepted runtime profile must define initialization and teardown, resource limits, blocking behavior, thread-safety, error values, and the capability metadata format. Conformance must include unavailable-capability failures and stress cases for ownership and synchronization.

## Open work

The first runtime profile should target a small, deterministic capability set. It should leave operating-system-specific services behind explicit extensions rather than making them implicit language requirements.

The base language does not require a particular allocator, garbage collector, scheduler, or operating-system API. Until a profile is accepted, runtime behavior described in the language documents is the semantic minimum, not an implementation prescription.
