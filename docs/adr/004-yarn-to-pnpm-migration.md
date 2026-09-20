# ADR 004: Migrate Package Management from Yarn to pnpm

## Status

Accepted

## Context

This repo used Yarn Berry (`nodeLinker: node-modules`) while other personal
repos (`@sm-incubator`, `@bje` enterprise repos) had already standardized on
pnpm. Maintaining both toolchains means duplicated configuration knowledge
(`.yarnrc.yml` vs `pnpm-workspace.yaml`, `resolutions` vs `overrides`) with no
functional benefit — neither Yarn's plug'n'play resolution nor any
Yarn-specific feature is used here.

See [issue #644](https://github.com/brianespinosa/tacomawedge/issues/644) for
the full migration scope.

## Decision

Switch to pnpm, pinned via `"packageManager": "pnpm@12.4.2"` in `package.json`.
`pnpm-workspace.yaml` carries the settings that used to live in `.yarnrc.yml`
and `package.json`:

| Yarn | pnpm |
| --- | --- |
| `defaultSemverRangePrefix: ""` | `savePrefix: ''` |
| `nodeLinker: node-modules` | dropped; pnpm's default `isolated` linker is stricter and held for this project |
| `logFilters` YN0002/YN0060/YN0086 as `error` | `strictPeerDependencies: true` and `autoInstallPeers: false` |
| `logFilters` YN0068/YN0069 as `error` | no equivalent; pnpm does not detect unused or redundant `packageExtensions` (see Consequences) |
| `packageExtensions` | none needed; all five entries were removed after verifying pnpm satisfies each peer from the resolved graph |
| `resolutions` | `overrides`, with `parent>child` selectors instead of `parent/child` |
| `yarnPath` + `.yarn/releases/` | deleted; `packageManager` plus pnpm's default `pmOnFail: download` handles versioning |

`minimumReleaseAge: 7200` (5 days) is added as supply-chain hardening with no
Yarn equivalent, kept at or below the Dependabot `cooldown.default-days: 7`
added to `.github/dependabot.yml` in the same change, so Dependabot never
proposes a version pnpm would refuse under `--frozen-lockfile`.

## Consequences

- **All five `packageExtensions` were dropped, not ported.** Each was removed
  and a full clean install re-run; none was required. pnpm resolves peers
  across the whole graph rather than per branch, so `typescript` (a direct
  devDependency) satisfies the `vercel`, `@vercel/express` and
  `@astrojs/language-server` peers, and `@emnapi/core`/`@emnapi/runtime` are
  supplied as real dependencies by `@bruits/satteri-wasm32-wasi` (via Astro's
  MDX pipeline) and `@img/sharp-wasm32` (via `sharp`), satisfying
  `@napi-rs/wasm-runtime`. This is a property of this repo's dependency shape:
  a repo without Astro or `sharp` in its tree does need an explicit exception.
- **Lost enforcement**: this was the only repo filtering YN0069 (redundant
  `packageExtensions`) as an error. pnpm has no mechanism to detect an unused
  or redundant `packageExtensions` entry, so if entries are added later they
  can rot silently.
- **Linker held**: Astro has historically been sensitive to strict
  `node_modules` layouts. pnpm's default isolated linker was verified to work
  for `astro build`, `astro check`, and the Playwright/axe e2e suite without
  declaring `nodeLinker: hoisted`. If a future dependency forces a switch to
  the hoisted linker, that is a deviation from this decision and warrants its
  own ADR.
- CI caching moved from the Yarn cache folder to the pnpm content-addressable
  store; see ADR 005.
