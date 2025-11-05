// oxlint-disable-next-line no-self-import -- We are safe bro
import type { KnipConfig } from 'knip'

// oxlint-disable-next-line no-default-export -- This is how knip works
export default {
  ignore: ['./examples/**'],
  oxlint: { config: ['.oxlintrc.json'] },
  prettier: { config: ['prettier.config.js'] },
  typescript: { config: ['tsconfig.json', 'tsconfig.build.json'] },
  entry: ['./src/v3/index.ts', './src/v2/index.ts'],
} satisfies KnipConfig
