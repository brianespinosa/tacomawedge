// https://github.com/stylelint/stylelint/blob/main/docs/user-guide/configure.md

module.exports = {
  ignoreFiles: ['**/coverage/**/*'],
  overrides: [
    {
      files: [
        '*.module.css',
        '**/*.module.css',
        '*.module.scss',
        '**/*.module.scss',
      ],
      rules: {
        'selector-class-pattern': '[^]*',
      },
    },
    {
      files: ['apps/**/_app.scss'],
      rules: {
        'selector-id-pattern': '__next',
      },
    },
  ],
  extends: [
    'stylelint-config-standard', // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-recommended-scss', // https://github.com/stylelint-scss/stylelint-config-recommended-scss
    'stylelint-config-css-modules', // MUST come after config-standard and recommended-scss https://github.com/pascalduez/stylelint-config-css-modules
    'stylelint-config-idiomatic-order', // https://github.com/ream88/stylelint-config-idiomatic-order
  ],
  plugins: [
    // 'stylelint-order', // https://github.com/hudochenkov/stylelint-order
  ],
  rules: {},
};
