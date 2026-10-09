import { readdirSync } from "node:fs";
import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));
const pages = Object.fromEntries(
  readdirSync(root)
    .filter(file => file.endsWith(".html"))
    .map(file => [basename(file, ".html"), resolve(root, file)])
);

export default defineConfig({
  root,
  build: {
    rollupOptions: {
      input: pages
    }
  }
});
