import type { KnipConfig } from 'knip'

export default {
  oxlint: { config: ['.oxlintrc.json'] },
  typescript: { config: ['tsconfig.json', 'tsconfig.build.json'] },
  entry: ['./src/rest-v3/index.ts'],
} satisfies KnipConfig
