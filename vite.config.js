import { defineConfig } from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    },
    lib: {
      formats: ['iife'],
      entry: path.resolve(__dirname, "src/main.js"),
      name: "Instruments",
    },
  },
})