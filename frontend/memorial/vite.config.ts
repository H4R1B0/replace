import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths(), svgr()],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  cacheDir: ".yarn",
  define: {
    "meta.env.VITE_APP_ENV": mode === "production" ? "production" : "development",
    // global: "globalThis",
  },
}));
