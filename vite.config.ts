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
    rollupOptions: {
        input: {
            main: path.resolve(__dirname, 'index.html'),
            popup: path.resolve(__dirname, 'popup.html'),
            'content-script': path.resolve(__dirname, 'src/content/index.tsx'),
        },
        output: {
            entryFileNames: (chunkInfo) => {
                if (chunkInfo.name === 'content-script') {
                    return 'content-script.js';
                }
                return 'assets/[name]-[hash].js';
            },
            assetFileNames: (assetInfo) => {
                if (assetInfo.name && assetInfo.name === 'content-script.css') {
                    return 'content-script.css';
                }
                return 'assets/[name]-[hash][extname]';
            }
        }
    }
  }
})
