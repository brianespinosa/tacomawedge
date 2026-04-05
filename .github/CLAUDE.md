# .github/CLAUDE.md

## Composite Action

Config: `.github/actions/setup/action.yml`

Shared setup used by all CI jobs after checkout: Node (from `.nvmrc`), corepack enable, `yarn install --immutable`.

Note: `actions/checkout` must remain in each job directly — local composite actions can only be resolved after the repo is checked out.

## CI Workflow

Config: `.github/workflows/ci.yml`

Runs on push and pull request to `main`. Jobs:

- **biome**, **knip**, **typecheck**, and **test** run in parallel on all events.
- **build** runs after all four pass — deploys to Vercel (preview on PR, production on `main`), outputs the deployment URL. Uses `brianespinosa/next-build-cache@main` for build caching.
- **e2e** runs on pull requests only, after `build` — runs Playwright tests against the Vercel preview URL. Caches Playwright browsers by version. Uploads the HTML report as an artifact (30-day retention).

Concurrency is configured to cancel in-progress runs on PRs when new commits are pushed. Runs on `main` are never cancelled.

## Vercel Deployment

The `build` job requires three repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. On PRs it deploys a preview; on `main` it deploys to production. The deployment URL is passed to the `e2e` job via job outputs.

`VERCEL_BYPASS_SECRET` is used by the `e2e` job to bypass Vercel deployment protection when running tests.

## e2e Tests

Config: `playwright.config.ts`, tests: `e2e/`

Tests run against a live Vercel deployment URL (`PLAYWRIGHT_BASE_URL`). They do not run against `next dev` or `next start`. See `e2e/CLAUDE.md` for selector strategy and test file documentation.

`PLAYWRIGHT_BASE_URL` is also set to a dummy value in the `knip` job so that importing `playwright.config.ts` does not throw during dead code analysis.

## Dependabot

Config: `.github/dependabot.yml`

Monitors `npm` dependencies weekly, targeting `main`. Commit messages use `chore(deps):` prefix via the `commit-message` config.

## Notes

- Node version is pinned via `.nvmrc` — update there to change it everywhere
- Corepack must be enabled before running any `yarn` commands — handled in the composite action
