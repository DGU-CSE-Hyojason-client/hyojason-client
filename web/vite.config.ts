import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://exp.host",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/--/api"),
      },
    },
  },
});
