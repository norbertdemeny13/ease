module.exports = {
  root: true,

  env: {
    node: true,
  }, // env

  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ], // extends

  parserOptions: {
    ecmaVersion: 2020,
  }, // parserOptions

  rules: {
    // Vue rules
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 4,
      },
    ],
    'vue/max-len': [
      'error',
      {
        code: 100,
        template: 200,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreHTMLTextContents: true,
      },
    ],
    'vue/no-static-inline-styles': [
      'error',
      {
        allowBinding: true,
      },
    ],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 1,
      },
    ],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/static-class-names-order': ['off'],

    // Import rules
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/no-default-export': ['error'],
    'import/no-extraneous-dependencies': ['off'],
    'import/prefer-default-export': ['off'],

    // TypeScript rules
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': ['off'],

    // ESLint rules
    'arrow-parens': [
      2,
      'as-needed',
      {
        requireForBlockBody: true,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
  }, // rules

  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        'import/no-default-export': ['off'],
        'vue/name-property-casing': ['error', 'kebab-case'],
        'max-len': 'off',
      },
    },
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ], // overrides

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.d.ts'],
      },
    },
  }, // settings
};
