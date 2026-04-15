export default {
  extends: ['stylelint-config-standard-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'function-name-case': null,
    'keyframes-name-pattern': '^[a-z][a-zA-Z0-9]+$',
    'scss/at-function-pattern': '^[a-z][a-zA-Z0-9]+$',
    'no-duplicate-selectors': true,
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'selector-class-pattern': ['^[a-z][a-zA-Z0-9\\/\\\\-]+$', { resolveNestedSelectors: true }],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'theme',
          'utility',
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'custom-variant',
        ],
      },
    ],
    'scss/double-slash-comment-whitespace-inside': null,
  },
};
