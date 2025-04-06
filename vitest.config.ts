import { defineConfig } from 'vitest/config';

export default defineConfig ({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: 'tests/setup.ts' // runs setup.ts before each test file - configures test environment
    }
});
