import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

// oxlint-disable-next-line typescript/prefer-readonly-parameter-types -- vite config callback signature
export default defineConfig(({ mode }) => ({
  test: {
    include: ['./src/**/*.test.ts'],
    env: loadEnv(mode, '.', ''),
    maxWorkers: 1,
  },
}))
