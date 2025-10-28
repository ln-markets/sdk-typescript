// oxlint-disable-next-line extensions -- Subpath imports are allowed
import { defineConfig } from 'vitest/config'

// oxlint-disable-next-line no-default-export -- This is how vitest works
export default defineConfig({
  test: {
    include: ['./**/*.test.ts'],
    maxWorkers: 1,
    setupFiles: ['./__test__/setup.ts'],
  },
})
