# ADR 005: Explicit pnpm Store Cache in GitHub Actions

## Status

Accepted (supersedes ADR-002)

## Context

Following the migration to pnpm (ADR 004), GitHub Actions CI needs to cache
the pnpm content-addressable store instead of the Yarn cache folder to avoid
re-downloading dependencies on every run.

`actions/setup-node` provides a built-in `cache: pnpm` option for this
purpose. It is unsuitable for our setup for the same reason the Yarn cache
option was in ADR 002: it runs `pnpm store path` during cache key resolution,
which requires `pnpm` to already be resolvable on `PATH`. Corepack has not
enabled the project-pinned package manager yet at that point in the job, so
the step would either fail or fall back to whatever `pnpm` (if any) happens to
be preinstalled on the runner image, rather than the version pinned in
`packageManager`.

## Decision

We use explicit caching in the `.github/actions/setup` composite action:

1. `actions/setup-node` runs with no `cache` option
2. `corepack enable` runs to activate the project-pinned pnpm version
3. `pnpm store path` captures the correct store directory path
4. `actions/cache` restores/saves the cache using a key derived from
   `runner.os` + `hashFiles('**/pnpm-lock.yaml')`
5. `pnpm install --frozen-lockfile` runs with the warm cache available

## Consequences

- Cache key is shared across all CI jobs that use the same `pnpm-lock.yaml`,
  so the first job to complete install will populate the cache for
  subsequent runs.
- When `pnpm-lock.yaml` changes, the cache key changes and a full install
  runs. The `restore-keys` fallback allows partial cache hits on the
  previous lockfile.
- This approach must be revisited if `actions/setup-node` ships a way to
  resolve the cache key after corepack activates the pinned package manager.
