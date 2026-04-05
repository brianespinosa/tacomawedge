import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    // Git worktrees used by Claude Code are checked out under .claude/worktrees/.
    // Knip would otherwise scan them and report false positives.
    '.claude/**',
  ],

  ignoreDependencies: [
    // Imported via @import url('normalize.css') in src/app/layout.scss.
    // knip does not parse SCSS files, so the reference is invisible to static analysis.
    'normalize.css',

    // Required by Next.js for image optimization at runtime.
    // Not directly imported in application source code.
    'sharp',
  ],

  ignoreBinaries: [
    // macOS system binary used in the open-browser npm script to open the dev
    // server URL in the default browser. Not an npm package.
    'open',

    // Invoked via npx in the lefthook sort-package-json pre-commit hook.
    // Not installed as a project dependency — npx fetches it on demand.
    'sort-package-json',
  ],
};

export default config;
