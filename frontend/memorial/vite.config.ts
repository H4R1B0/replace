import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      input: "src/main.tsx", // 이 부분을 프로젝트의 진입점 파일로 설정
    },
    commonjsOptions: {
      include: [".yarn/**"],
    },
  },
  cacheDir: "./.vite",
  define: {
    global: "globalThis",
  },
  //
  optimizeDeps: {
    include: ["*.tsx"], // 모든 .js 파일을 포함하도록 설정
  },
});
