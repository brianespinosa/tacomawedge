// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tacomawedge.org',
  // Static output only — there is nothing to render on a server, so no adapter.
  output: 'static',
  integrations: [mdx()],
  build: {
    // Two pages' worth of CSS. Inlining it keeps the whole document to a single
    // request, which is the point of the Astro move. See ADR 003.
    inlineStylesheets: 'always',
  },
});
