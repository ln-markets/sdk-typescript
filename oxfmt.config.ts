import { defineConfig } from 'oxfmt'

export default defineConfig({
  arrowParens: 'always',
  printWidth: 80,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  ignorePatterns: ['cspell.json', '**/dist'],
  experimentalSortImports: {
    groups: [
      ['side_effect'],
      ['builtin'],
      ['external', 'type-external'],
      ['parent', 'type-parent'],
      ['sibling', 'type-sibling'],
      ['index', 'type-index'],
    ],
  },
  experimentalSortPackageJson: {
    sortScripts: true,
  },
})
