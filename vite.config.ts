import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      fileName(format) {
        return `index.${format}.js`;
      },
      formats: ["es", "cjs", "umd"],
    },
  },
  resolve: { alias: { src: resolve("src/") } },
});
