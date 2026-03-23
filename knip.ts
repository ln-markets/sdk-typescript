import type { KnipConfig } from 'knip'

export default {
  oxlint: { config: ['.oxlintrc.json'] },
  typescript: { config: ['tsconfig.json', 'tsconfig.build.json'] },
  entry: ['./src/v3/index.ts', './src/v2/index.ts'],
} satisfies KnipConfig
