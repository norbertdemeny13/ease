const config = {
  extends: 'stylelint-config-standard',

  plugins: [
    'stylelint-scss',
    'stylelint-order',
  ], // plugins

  rules: {
    // Stylelint rules
    'at-rule-no-unknown': null,
    'color-hex-length': 'long',
    'declaration-no-important': null,
    'function-max-empty-lines': null,
    'no-empty-source': null,
    'number-leading-zero': null,
    'value-list-max-empty-lines': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'order/properties-alphabetical-order': true,

    // Scss rules
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-if-parentheses-space-before': 'always',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-function-parentheses-space-before': 'never',
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-parentheses-space-before': 'always',
    'scss/at-rule-no-unknown': true,
    'scss/declaration-nested-properties': 'never',
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/operator-no-newline-after': true,
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
  }, // rules
};

// Export module
module.exports = config;
