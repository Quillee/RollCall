import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import tailwindcss from "@tailwindcss/vite"

const dir = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [tailwindcss(), solid()],
  resolve: {
    alias: {
      "@rollc-ui": dir("./src/components"),
      "@rollc-util": dir("./src/utils"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
})
