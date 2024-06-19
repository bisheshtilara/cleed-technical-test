/// <reference types="vitest" />

import vue from "@vitejs/plugin-vue"
import autoprefixer from "autoprefixer"
import path from "path"
import tailwind from "tailwindcss"
import { defineConfig } from "vite"

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
