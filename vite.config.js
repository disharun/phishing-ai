import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { readFileSync, writeFileSync, copyFileSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Plugin to copy manifest and extension files after build
    {
      name: "copy-extension-files",
      closeBundle() {
        const distPath = resolve(__dirname, "dist");
        const publicPath = resolve(__dirname, "public");
        
        // Copy manifest.json
        try {
          copyFileSync(
            resolve(publicPath, "manifest.json"),
            resolve(distPath, "manifest.json")
          );
          console.log("✓ Copied manifest.json");
        } catch (err) {
          console.warn("Could not copy manifest.json:", err);
        }

        // Copy background.js
        try {
          copyFileSync(
            resolve(publicPath, "background.js"),
            resolve(distPath, "background.js")
          );
          console.log("✓ Copied background.js");
        } catch (err) {
          console.warn("Could not copy background.js:", err);
        }

        // Copy content.js
        try {
          copyFileSync(
            resolve(publicPath, "content.js"),
            resolve(distPath, "content.js")
          );
          console.log("✓ Copied content.js");
        } catch (err) {
          console.warn("Could not copy content.js:", err);
        }
      },
    },
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  base: "./",
});
