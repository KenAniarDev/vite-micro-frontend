import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    federation({
      name: "remote_app_1",
      filename: "remoteEntry.js",
      exposes: {
        "./NewPawn": "./src/NewPawn.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "@mui/material",
        "@emotion/react",
        "@emotion/styled",
      ],
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
    port: 5002,
    cors: true,
    strictPort: true,
  },
}));
