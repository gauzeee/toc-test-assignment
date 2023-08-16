/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
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
    server: {
      port: Number(process.env.VITE_DEV_SERVER_PORT || '5147'),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: '@testing-library/jest-dom',
      mockReset: true,
      dir: 'src',
      coverage: {
        provider: 'v8',
        exclude: ['**/__fixtures__/*', 'integrations'],
        reporter: ['json-summary'],
      },
    },
  })
}
