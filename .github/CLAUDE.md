# .github/CLAUDE.md

## Composite Action

Config: `.github/actions/setup/action.yml`

Shared setup used by all CI jobs after checkout: Node (from `.nvmrc`), corepack enable, `yarn install --immutable`.

Note: `actions/checkout` must remain in each job directly — local composite actions can only be resolved after the repo is checked out.

## CI Workflow

Config: `.github/workflows/ci.yml`

Runs on push and pull request to `main`. Jobs:

- **biome**, **typecheck**, and **test** run in parallel on all events.
- **build** runs after all three pass — runs `yarn build` with Turbopack, using `brianespinosa/next-build-cache@main` for caching.

Concurrency is configured to cancel in-progress runs on PRs when new commits are pushed. Runs on `main` are never cancelled.

## Dependabot

Config: `.github/dependabot.yml`

Monitors `npm` dependencies weekly, targeting `main`. Commit messages use `chore(deps):` prefix via the `commit-message` config.

## Notes

- Node version is pinned via `.nvmrc` — update there to change it everywhere
- Corepack must be enabled before running any `yarn` commands — handled in the composite action
