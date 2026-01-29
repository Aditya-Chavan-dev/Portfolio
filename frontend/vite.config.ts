import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3005,
    host: '127.0.0.1',
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/desktop'),
      '@mobile': path.resolve(__dirname, './src/mobile'),
      '@shared': path.resolve(__dirname, './src/shared-core'),
    },
  },
})
