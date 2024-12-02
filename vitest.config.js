import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./**/*.test.ts'],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    setupFiles: ['./__test__/context.ts'],
  },
})
