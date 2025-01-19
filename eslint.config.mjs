import unicorn from 'eslint-plugin-unicorn';
import jsonFormat from 'eslint-plugin-json-format';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['*', '!src', '!**/package.json', '**/.pnp.*', '**/node_modules'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:unicorn/recommended',
    'next',
    'prettier',
  ),
  {
    plugins: {
      unicorn,
      'json-format': jsonFormat,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
    },
  },
];
