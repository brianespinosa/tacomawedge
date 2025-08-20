import simpleImportSort from 'eslint-plugin-simple-import-sort';
import jsonFormat from 'eslint-plugin-json-format';
import pluginJest from 'eslint-plugin-jest';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '*',
      '!src',
      '!**/package.json',
      '**/.pnp.*',
      '**/node_modules',
      '**/coverage',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'next/core-web-vitals',
    'next/typescript',
    'prettier',
  ),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'json-format': jsonFormat,
      jest: pluginJest,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: pluginJest.environments.globals.globals,
    },

    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',

      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^.+\\.s?css$'],
            ['^react$', '^next', '^[a-z]'],
            ['^@'],
            ['^~'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^\\u0000'],
          ],
        },
      ],
    },
  },
];
