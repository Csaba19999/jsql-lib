import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "jsql",
      fileName: (format) => `index.${format}.js`,
    },
  },
  resolve: { alias: { src: resolve("src/") } },
  plugins: [dts()],
  publicDir: false,
});
