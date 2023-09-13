import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.obj"],
  server: {
    port: 3000,
    host: true,
    open: "/",
  },
  build: {
    outDir: "build",
    commonjsOptions: {
      include: [".yarn/**"],
    },
  },
  cacheDir: ".yarn",
  define: {
    global: "globalThis",
  },
});
