import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "is-hotkey": path.resolve(__dirname, "node_modules/is-hotkey/lib/index.js"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
        input: {
            main: path.resolve(__dirname, 'index.html'),
            sidebar: path.resolve(__dirname, 'sidebar.html'),
        },
        output: {
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash][extname]',
        }
    }
  }
})
