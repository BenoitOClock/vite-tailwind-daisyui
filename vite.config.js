import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

function getHtmlEntryFiles(srcDir) {
  const entry = {};

  function traverseDir(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory) {
        traverseDir(filePath);
      } else if (path.extname(file) === ".html") {
        const name = path.relative(srcDir, filePath).replace(/\..*$/, "");
        entry[name] = filePath;
      }
    });
  }

  traverseDir(srcDir);
  console.log(entry);
  return entry;
}

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: getHtmlEntryFiles("src"),
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
  optimizeDeps: {
    entries: "src/**/*{.html,.css,.js}",
  },
});
