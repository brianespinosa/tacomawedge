# e2e/CLAUDE.md

## Running Tests

Tests require a deployed Vercel URL — they do not run against `astro dev`.
Set environment variables before running:

- `PLAYWRIGHT_BASE_URL` — the target URL (e.g., a Vercel preview deployment URL)
- `VERCEL_BYPASS_SECRET` — Vercel protection bypass token (optional locally)

## Selector Strategy

**Prefer `getByRole` and other accessible locators. Never use `data-testid` or other test-only attributes.**

Playwright's accessible locator API — `getByRole`, `getByLabel`, `getByText` — queries the accessibility tree rather than the DOM. This means tests interact with the app the same way a screenreader or assistive technology would.

Reasons to avoid `data-testid`:

- **It tests nothing meaningful.** A `data-testid` can exist on a completely inaccessible element and the test would still pass.
- **It couples tests to implementation.** Test IDs are noise in the production markup.
- **`getByRole` gives you both for free.** If `page.getByRole('link', { name: 'Resources' })` passes, you know the element exists, has the correct ARIA role, and has a meaningful accessible name.

Locator priority (highest to lowest):

1. `page.getByRole(role, { name })` — role + accessible name from the accessibility tree
2. `page.getByLabel(text)` — form elements associated with a `<label>` or `aria-label`
3. `page.getByText(text)` — visible text content, for non-interactive elements
4. CSS/attribute selectors — only as a last resort when no semantic locator applies

## Test Files

- `home.spec.ts` — site heading and navigation render; no framework JavaScript loads; axe accessibility scan passes
- `navigation.spec.ts` — Resources nav link navigates to `/resources`; site heading link navigates back to home
- `accessibility.spec.ts` — axe accessibility scan passes on the resources page

## Axe Scans and Entrance Animations

Both axe specs set `test.use({ reducedMotion: 'reduce' })`. The site's entrance
animations start every element in `<main>` at `opacity: 0`; axe skips fully
transparent nodes and computes contrast against blended colors on partly-faded
ones, so a scan run mid-animation is both incomplete and flaky. Keep the
reduced-motion setting on any spec that runs axe.
