import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import jsonFormat from 'eslint-plugin-json-format';
import pluginJest from 'eslint-plugin-jest';
import prettier from 'eslint-config-prettier';

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
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': next,
      react,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      'json-format': jsonFormat,
      jest: pluginJest,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',

      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/react-in-jsx-scope': 'off',

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
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: pluginJest.environments.globals.globals,
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  prettier,
];
