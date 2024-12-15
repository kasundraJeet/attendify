import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },  
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));