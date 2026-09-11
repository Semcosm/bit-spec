# Non-goals

**Status:** Informative draft

The initial specification does not attempt to define:

- a particular editor, build server, package registry, or IDE;
- a universal operating-system or device API;
- a single garbage collector or scheduler implementation;
- source compatibility with another programming language;
- unrestricted reflection, implicit global mutation, or data races;
- a stable binary format for artifacts before an ABI profile is accepted.

Leaving a topic out is not permission to invent behavior. Implementations should use an explicit extension or return a capability error.
