# ADR 005: pnpm Setup and Store Cache in GitHub Actions

## Status

Accepted

## Context

Following the migration to pnpm (ADR 004), GitHub Actions CI needs to install
pnpm and cache its content-addressable store instead of the Yarn cache folder.

`actions/setup-node` provides a built-in `cache: pnpm` option. It runs
`pnpm store path` while resolving the cache key, so pnpm must already be on
`PATH` at that point. ADR 002 rejected the equivalent Yarn option for the same
reason.

Two mechanisms can put the pinned pnpm on `PATH` first:

- `corepack enable`, which reads `packageManager` from `package.json`. Node
  bundles Corepack through Node 24 only; the Node TSC voted to stop
  distributing it from Node 25. pnpm's own CI documentation now recommends
  against Corepack.
- `pnpm/action-setup`, which installs pnpm directly. With no `version` input
  it also reads `packageManager`, so the version is not duplicated and cannot
  drift from the pin.

## Decision

The `.github/actions/setup` composite action runs, in order:

1. `pnpm/action-setup` with no `version` input, taking the version from
   `packageManager` in `package.json`
2. `actions/setup-node` with `node-version-file: .nvmrc` and `cache: pnpm`
3. `pnpm install --frozen-lockfile`

Because pnpm is on `PATH` before step 2, the built-in cache resolves the store
path correctly and no explicit `actions/cache` step is needed.

## Consequences

- One fewer step than the explicit-cache approach, and no hand-maintained
  cache key. `actions/setup-node` derives it from the lockfile.
- No dependency on Corepack, so moving past Node 24 does not break CI.
- The pnpm version lives in exactly one place, `packageManager`. Bumping it
  needs no CI change.
- This supersedes the Yarn cache arrangement in ADR 002, which described the
  same problem for `yarn config get cacheFolder`.
