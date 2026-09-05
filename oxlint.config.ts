import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['typescript', 'unicorn', 'eslint', 'oxc'],
  // Every rule in every plugin is on; disable by category, then by rule.
  categories: {
    correctness: 'error',
    suspicious: 'error',
    pedantic: 'error',
    perf: 'error',
    style: 'error',
    restriction: 'error',
  },
  ignorePatterns: ['dist', 'coverage'],
  rules: {
    // Force file extensions on relative imports
    'import/extensions': ['error', 'always'],
    // We always use async
    'oxc/no-async-await': 'off',
    'typescript/explicit-function-return-type': 'off',
    'typescript/explicit-module-boundary-types': 'off',
    'oxc/no-optional-chaining': 'off',
    'eslint/no-undefined': 'warn',
    'oxc/no-barrel-file': 'warn',
    'import/no-named-export': 'off',
    'import/group-exports': 'off',
    // Does not handle type imports
    'eslint/no-duplicate-imports': 'off',
    'import/prefer-default-export': 'off',
    'eslint/arrow-body-style': 'off',
    'eslint/no-ternary': 'off',
    'eslint/id-length': 'off',
    // Oxfmt sorts imports
    'eslint/sort-imports': 'off',
    'eslint/no-continue': 'off',
    'eslint/require-await': 'off',
    'import/max-dependencies': 'off',
    'eslint/max-lines-per-function': 'off',
    'eslint/sort-keys': 'off',
    'eslint/no-magic-numbers': 'off',
    'oxc/no-rest-spread-properties': 'off',
    'eslint/no-empty-function': 'off',
    'import/exports-last': 'off',
    'eslint/max-statements': 'off',
    'eslint/one-var': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '__test__/**/*.ts'],
      rules: {
        'typescript/no-unsafe-assignment': 'off',
        'typescript/no-unsafe-type-assertion': 'off',
        'eslint/no-empty-pattern': 'off',
        'unicorn/no-null': 'off',
      },
    },
    {
      files: ['**/*.config.{js,ts}', 'knip.ts'],
      rules: {
        'import/extensions': 'off',
        'import/no-default-export': 'off',
        'import/no-anonymous-default-export': 'off',
      },
    },
    {
      // Exhaustive hand-mirror of the stream/v1 contract; splitting it would lose locality
      files: ['src/stream/v1/types.ts'],
      rules: {
        'eslint/max-lines': 'off',
      },
    },
    {
      files: ['examples/**/*.ts'],
      rules: {
        'eslint/no-console': 'off',
        'eslint/no-void': 'off',
        'unicorn/no-process-exit': 'off',
        'typescript/no-unsafe-type-assertion': 'off',
        'typescript/strict-boolean-expressions': 'off',
        'typescript/prefer-readonly-parameter-types': 'off',
        'eslint/init-declarations': 'off',
        'eslint/max-lines': 'off',
        'eslint/capitalized-comments': 'off',
        'eslint/prefer-destructuring': 'off',
      },
    },
  ],
})
