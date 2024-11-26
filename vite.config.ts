import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.join(__dirname, "frontend"),
  build: {
    outDir: path.join(__dirname, "webroot"),
    emptyOutDir: true,
  }
});