import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button.tsx",
        "./Card": "./src/Card.tsx",
      },
      shared: ["react", "react-dom"],
    }),
    // Log when build completes
    {
      name: "build-notify",
      buildEnd() {
        const now = new Date().toLocaleTimeString();
        console.log(`\n✅ [${now}] Remote app rebuilt successfully!\n`);
      },
    },
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: mode === "development" ? false : "esbuild",
    cssCodeSplit: false,
    sourcemap: mode === "development" ? "inline" : false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  preview: {
    port: 5001,
    cors: true,
    strictPort: true,
  },
}));
