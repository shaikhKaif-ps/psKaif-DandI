/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'unused-imports',
    'simple-import-sort',
    'eslint-plugin-import',
    'eslint-plugin-react-hooks',
  ],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Prettier
    'prettier/prettier': ['warn'],

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'off', // Handled by unused-imports
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Unused imports and vars
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],

    // Import sorting
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'import/order': 'off',

    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignorePatterns: ['node_modules', '.next', 'out', 'dist'],
};
