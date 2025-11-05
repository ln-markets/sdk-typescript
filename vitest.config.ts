// oxlint-disable-next-line extensions -- Subpath imports are allowed
import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => ({
  test: {
    include: ['./src/**/*.test.ts'],
    env: loadEnv(mode, '.', ''),
    maxWorkers: 1,
  },
}))
