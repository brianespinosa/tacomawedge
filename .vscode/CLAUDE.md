# .vscode

Editor configuration, committed to the repo. This directory was previously a
git submodule shared across projects; it was replaced because that config was
Next.js-specific and no longer applies after the Astro migration.

## Format-on-save is disabled for `.astro`

`settings.json` sets `"[astro]": { "editor.formatOnSave": false }`. This is
deliberate and **must not be re-enabled** without verifying the bug below.

Biome's experimental HTML formatter (`html.experimentalFullSupportEnabled` in
`biome.json`) can empty a component's entire `<style>` block when it runs
through the VS Code LSP on save. Reproduced against `InsetImage.astro`, which
lost both of its rules and was left with `<style></style>`.

The Biome **CLI** path is unaffected. `lefthook.yml` formats `.astro` files at
commit time via `biome check --write`, so they are still formatted by the same
Biome with the same config, just later than on save.

Re-enable once the upstream bug is fixed, and verify by saving a component that
has a `<style>` block before trusting it.

## Other settings

- Biome is the default formatter; the Astro extension handles highlighting,
  IntelliSense, and import updates on file move.
- `[mdx]` disables format-on-save because `biome.json` excludes `**/*.mdx`.
  Without it, another formatter would reformat files CI never checks.
