import { defineConfig } from "vite";
import { globSync } from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        globSync("src/**/*.html").map(file => [
          path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
  optimizeDeps: {
    entries: "src/**/*{.html,.css,.js}",
  },
});
