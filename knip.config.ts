import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    // Git worktrees used by Claude Code are checked out under .claude/worktrees/.
    // Knip would otherwise scan them and report false positives.
    '.claude/**',
  ],

  ignoreDependencies: [
    // Imported via @import in src/styles/global.css.
    // knip does not parse CSS files, so the reference is invisible to static analysis.
    'normalize.css',
  ],
};

export default config;
