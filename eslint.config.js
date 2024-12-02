import eslint from '@eslint/js'
import pluginVitest from '@vitest/eslint-plugin'
import configPrettier from 'eslint-config-prettier'
import pluginJsdoc from 'eslint-plugin-jsdoc'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginPreferArrowFunction from 'eslint-plugin-prefer-arrow-functions'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const GLOB_ALL = ['**/*.{js,ts,tsx,mjs}']
const GLOB_JS = ['**/*.{js,cjs,mjs}']
const GLOB_TS = ['**/*.{ts,tsx}']

const unicorn = tseslint.config(
  {
    files: GLOB_ALL,
    ...pluginUnicorn.configs['flat/recommended'],
  },
  {
    rules: {
      'unicorn/no-nested-ternary': 'off',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/prefer-event-target': 'off',
      'unicorn/prefer-logical-operator-over-ternary': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  }
)

const javascript = tseslint.config(
  {
    files: GLOB_ALL,
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
      },
    },
    name: 'javascript',
    rules: eslint.configs.recommended.rules,
  },
  {
    files: GLOB_ALL,
    ignores: ['**/*.tsx'],
    name: 'prefer-arrow-function',
    plugins: {
      'prefer-arrow-functions': pluginPreferArrowFunction,
    },
    rules: {
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        { disallowPrototype: true, singleReturnOnly: false },
      ],
    },
  }
)

const test = tseslint.config({
  files: ['**/*.test.ts'],
  name: 'vitest',
  plugins: { vitest: pluginVitest },
  rules: {
    ...pluginVitest.configs.recommended.rules,
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'vitest/no-focused-tests': ['error', { fixable: false }],
  },
})

const typescript = tseslint.config(
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/no-unnecessary-type-parameters': 'warn',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowBoolean: true,
          allowNumber: true,
        },
      ],
    },
  }
)

const jsDoc = tseslint.config(
  {
    ...pluginJsdoc.configs['flat/contents-typescript-error'],
    files: GLOB_TS,
  },
  {
    ...pluginJsdoc.configs['flat/logical-typescript-error'],
    files: GLOB_TS,
  },
  {
    ...pluginJsdoc.configs['flat/stylistic-typescript-error'],
    files: GLOB_TS,
  },
  {
    ...pluginJsdoc.configs['flat/recommended-error'],
    files: GLOB_JS,
  },
  {
    rules: {
      'jsdoc/lines-before-block': 'off',
      'jsdoc/require-hyphen-before-param-description': 'error',
      'jsdoc/require-jsdoc': 'off',
    },
  }
)

const ignored = tseslint.config({
  ignores: [
    '**/dist',
    '**/build',
    '**/node_modules',
    '**/coverage',
    '**/reports',
    '**/*.cjs',
    '**/tree.gen.ts',
    '**/.astro',
  ],
  name: 'ignored',
})

const disabledTypecheck = tseslint.config({
  files: ['**/*.{js,cjs,mjs}'],
  ...tseslint.configs.disableTypeChecked,
})

const typescriptParser = {
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.js'],
      },
    },
  },
}

const unusedImports = tseslint.config({
  plugins: {
    'unused-imports': pluginUnusedImports,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
  },
})

const perfectionist = tseslint.config({
  ...pluginPerfectionist.configs['recommended-natural'],
})

export default tseslint.config(
  ...javascript,
  ...typescript,
  ...unicorn,
  ...test,
  ...ignored,
  ...unusedImports,
  ...jsDoc,
  typescriptParser,
  configPrettier,
  ...disabledTypecheck,
  ...perfectionist
)
