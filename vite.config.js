import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";

export default defineConfig({
  plugins: [
    devtools({
      autostart: true,
    }),
    solidPlugin(),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://api.asraye.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    target: "esnext",
  },
});
