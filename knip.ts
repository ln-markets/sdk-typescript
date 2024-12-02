import type { KnipConfig } from 'knip'

export default {
  commitlint: { config: ['commitlint.config.js'] },
  eslint: { config: ['eslint.config.js'] },
  ignore: ['./examples/**'],
  prettier: { config: ['prettier.config.js'] },
} satisfies KnipConfig
