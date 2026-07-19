# ADR 003: Astro over Next.js

## Status

Accepted

## Context

This site is two pages (`/`, `/resources`) plus a 404. It has no dynamic
content, no API routes, no route handlers, no server actions, and no
middleware. All metadata was static object literals. Nothing on the site reads
`cookies()` or `headers()`, and nothing revalidates.

Despite that, the Next.js build shipped roughly 193 kB of gzipped React and App
Router runtime. Almost none of it was doing work:

- Exactly one authored `'use client'` file existed, `src/components/NavLink.tsx`,
  and only because it called `usePathname()` to highlight the active nav link.
- `motion` (Framer Motion) had four usages. Every one was a one-shot entrance
  animation on mount — fade/blur/slide with `staggerChildren`. No scroll
  triggers, no hover, no gestures, no exit or layout animations, no React state.
- `@radix-ui/themes` supplied twelve components, all presentational
  (`Container`, `Flex`, `Grid`, `Heading`, `Card`, `Section`, `Inset`,
  `Separator`, `Button`, `IconButton`, `Link`, `VisuallyHidden`). Not one
  interactive component — no Dialog, Popover, Tabs, or form control.
- `radix-ui`'s `NavigationMenu` rendered a two-link nav.
- `next-themes` had no `useTheme()` call and no user-facing toggle. It existed
  solely so Radix received a `.dark` class in response to
  `prefers-color-scheme`.

The precedent is [tacoma.fyi PR #35](https://github.com/brianespinosa/tacoma.fyi/pull/35),
recorded as [ADR 004](https://github.com/brianespinosa/tacoma.fyi/blob/main/docs/adr/004-astro-over-nextjs.md)
in that repository, which made the same move and went from 196,878 B to 3,772 B
gzipped and from 11 HTTP requests to 1.

## Decision

Convert the site to Astro with `output: 'static'` and no adapter.

**Framework.** Astro renders `.astro` components to HTML at build time and ships
no framework runtime. The active nav link is resolved from `Astro.url.pathname`
during the build. MDX moves from `@next/mdx` to `@astrojs/mdx`. `next/image`
becomes `astro:assets`, which is also sharp-backed. `@vercel/analytics/next`
becomes `@vercel/analytics/astro`, which is why no `@astrojs/vercel` adapter is
needed and the site stays purely static.

**Styling.** Radix Themes is dropped rather than replaced. We used only its
presentational slice, so there was no lock-in to preserve, and its internal
class names are private API that would be fragile to hand-write in `.astro`.

In its place, `src/styles/tokens.css` defines a small set of CSS custom
properties for space, type, radius, and color, and components carry scoped
`<style>` blocks written against them. The token values were lifted from the
computed styles of the previous Radix build (`accentColor="cyan"`,
`grayColor="slate"`, `radius="medium"`) so the site's appearance is unchanged.

We deliberately did *not* adopt a headless component library. Headless libraries
(Base UI, Radix Primitives, Ark UI, Headless UI) ship unstyled *behavior*, which
is the half we do not need, and every mainstream option is React-only — in Astro
they require a `client:*` directive and reintroduce the framework runtime this
change exists to remove. We also did not add a token package such as Open Props:
only about fifteen color values are actually load-bearing, so a full scale would
be more dependency than the site uses.

`normalize.css` is not used. Only five of its rules targeted an element this
site renders, and four were IE-era fixes (`main { display: block }`,
`a { background-color: transparent }`, `img { border-style: none }`,
`body { margin: 0 }` — the last of which we set ourselves). Only
`text-size-adjust`, which stops iOS Safari inflating text in landscape, was
worth keeping, and it is inlined in `global.css`. Removing the dependency cut
the inlined CSS from 7,862 B to 6,029 B (2,507 B to 1,969 B gzipped) with a
verified pixel-identical render across all three pages in both color schemes.

Note that Astro has no unused-CSS elimination — it minifies and bundles
per-page from the module graph, but never removes an unmatched selector. Any
stylesheet that is imported ships in full. That is why dropping the dependency
was the fix rather than relying on the build.

**Dark mode.** `next-themes` is removed with no replacement. A plain
`@media (prefers-color-scheme: dark)` block redefines the color tokens. Because
there is no toggle, there is no flash-of-wrong-theme to guard against and no
inline script is required.

**Animations.** The `motion` usages become CSS `@keyframes` with
`animation-delay`. `staggerChildren` becomes a set of `:nth-child` delay rules
generated in `Layout.astro`. The animation is applied through a custom property
(`--entrance-animation`) so that `prefers-reduced-motion: reduce` can disable it
by blanking that property, without `!important`. The previous build had no
reduced-motion handling at all.

The per-character heading fade that the Next.js build had (`CharacterFade`) was
dropped: it complicated page transitions for a decorative effect.

**Page transitions.** Astro serves a fresh document per page, so the header and
nav would otherwise be visibly rebuilt on every navigation. Native
cross-document view transitions
(`@view-transition { navigation: auto }`) give continuity with no
JavaScript, scoped to the header and nav via `view-transition-name`. Astro's
`<ClientRouter />` was rejected: it ships a client-side router, which would
break the zero-JS floor and fail the `ships no framework JavaScript` spec.

This is not Baseline — Chrome/Edge 126+, Safari 18.2+, no Firefox — and
degrades to a normal navigation where unsupported.

**Testing.** The eleven `@testing-library/react` unit test files (33 cases) and
the `vitest` 100% coverage thresholds are removed outright, along with `vitest`,
`happy-dom`, and the Testing Library packages. Astro's Container API for unit
testing `.astro` components is experimental and can break on minor releases.
Rather than depend on it or keep a coverage gate that no longer measures
anything meaningful, Playwright is now the only test layer. The three existing
spec files (six tests) — including the `@axe-core/playwright` zero-violation
scans — used role-based selectors and carried over unchanged. A new spec asserts that no
framework JavaScript loads, allowlisting only Vercel's injected scripts, so the
zero-JS floor cannot regress silently.

**CI and deployment.** The `test` job and the Next-specific
`brianespinosa/next-build-cache@main` step are removed from
`.github/workflows/ci.yml`. The `vercel pull` → `vercel build` →
`vercel deploy --prebuilt` sequence is framework-agnostic and is unchanged. A
`vercel.json` declaring `"framework": "astro"` is added, and the Vercel
project's Framework Preset must be switched to Astro in the dashboard.

## Consequences

- The home page went from roughly 193 kB of gzipped JavaScript to none. The
  built pages are 5.1 kB (`/`), 7.9 kB (`/resources`), and 5.0 kB (404)
  gzipped. With `build.inlineStylesheets: 'always'`, each page is a single
  document request; the only other requests are images and Vercel's analytics.
- **There is no longer any unit test coverage, and no coverage gate.** This is
  the most consequential trade in this change. Regressions must be caught by the
  Playwright specs, so any new user-facing behavior needs an e2e spec — the
  policy already recorded in `.github/CLAUDE.md` now carries the entire load.
- **The view transitions cannot be verified by our test suite.** Playwright's
  `toBeVisible()` ignores opacity, and the axe specs navigate with `page.goto()`,
  which does not trigger a cross-document transition at all — so the suite
  passes whether or not the transition works. Under Playwright the incoming
  document's `document.timeline.currentTime` stays frozen at 0 and its entrance
  animations never advance, which appears to be the harness never presenting a
  frame rather than real browser behaviour. Changes to view transitions must be
  checked manually in Chrome and Safari.
- Styling is our own. There is no upstream design system supplying new tokens or
  fixing contrast issues for us, and the token file must be edited by hand to
  change the palette.
- Adding a genuinely interactive component later means either a vanilla script,
  a platform primitive (`<dialog>`, `<details name>`, the Popover API, invoker
  commands), or an explicit decision to hydrate a framework island and give up
  the zero-JS floor. That decision should be recorded as its own ADR.
- `next-build-cache` is no longer used by this repository. It remains in use by
  other repositories and is unaffected.
- The `vite` pin in `resolutions` was removed. It existed for the vitest
  toolchain and held Vite at 7.3.5; Astro resolves its own Vite 8.x, which is
  newer than the version the pin was protecting.
- Biome's `.astro` support is experimental and requires
  `html.experimentalFullSupportEnabled` in `biome.json`. Without it, frontmatter
  bindings used only in the template are reported as unused variables. Note that
  `biome.json` cannot contain comments — a `//` causes Biome to silently match
  zero files rather than erroring.
- The Astro dev server runs on port 4321, not 3000.
