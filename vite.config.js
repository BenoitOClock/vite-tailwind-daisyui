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

console.log(
  Object.fromEntries(
    globSync("src/**/*.html").map(file => [
      // This remove `src/` as well as the file extension from each
      // file, so e.g. src/nested/foo.js becomes nested/foo
      path.relative(
        "src",
        file.slice(0, file.length - path.extname(file).length)
      ),
      // This expands the relative paths to absolute paths, so e.g.
      // src/nested/foo becomes /project/src/nested/foo.js
      fileURLToPath(new URL(file, import.meta.url)),
    ])
  )
);
