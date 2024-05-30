import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react({
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    proxy: {
      "/api/chat/dialogList": {
        target: "https://api.hyoja.shop",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "/--/api"),
      },
    },
  },
});
