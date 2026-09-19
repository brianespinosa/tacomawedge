# tacomawedge

See `README.md` for the repository overview. Area-specific guidance lives in subdirectory `CLAUDE.md` files; keep this root file minimal.

This is an **Astro** site (see `docs/adr/003-astro-over-nextjs.md`), not Next.js. There are no unit tests; Playwright (`yarn e2e`) is the only test layer, so any new user-facing feature needs an e2e spec. `e2e/home.spec.ts` asserts that no framework JavaScript loads; keep it passing.
