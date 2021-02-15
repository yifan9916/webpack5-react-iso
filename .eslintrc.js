module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier/@typescript-eslint',
    'plugin:testing-library/recommended',
    'plugin:testing-library/react',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-var': 'error',
    'prefer-const': 'warn',
    'prefer-destructuring': 'warn',
    'prettier/prettier': 'error',
  },
};
