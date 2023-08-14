/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: '@/server',
        replacement: path.resolve(__dirname, 'server'),
      },
    ],
  },
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '@testing-library/jest-dom',
    mockReset: true,
    coverage: {
      provider: 'v8',
      exclude: ['**/__fixtures__/*'],
    },
  },
})
