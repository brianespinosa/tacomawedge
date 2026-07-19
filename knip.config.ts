import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: [
    // Git worktrees used by Claude Code are checked out under .claude/worktrees/.
    // Knip would otherwise scan them and report false positives.
    '.claude/**',
  ],
};

export default config;
