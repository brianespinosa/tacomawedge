# tacomawedge

See `README.md` for the repository overview. Area-specific guidance lives in subdirectory `CLAUDE.md` files; keep this root file minimal.

This is an **Astro** site (see `docs/adr/003-astro-over-nextjs.md`), not Next.js. There are no unit tests; Playwright (`pnpm e2e`) is the only test layer, so any new user-facing feature needs an e2e spec. `e2e/home.spec.ts` asserts that no framework JavaScript loads; keep it passing.

## pnpm Install Warnings

`pnpm install` may produce warnings. All warnings MUST be resolved before closing any PR — investigate the cause and fix it (e.g. add or remove a `packageExtensions` entry in `pnpm-workspace.yaml`, pin a transitive dependency via `overrides`, or update the offending package). Use `peerDependencyRules` only as a last resort, and comment each entry with the package, the upstream reason, and why a real fix is not possible.
