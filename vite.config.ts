import {defineConfig} from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    origin: "https://localhost:5173",
    host: `0.0.0.0`,
    fs: {
      strict: false,
    },
    proxy: {
      "/inspector": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/inspector/, ""),
      },
    },
  },
  plugins: [
    basicSsl(),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader(
            "Cross-Origin-Embedder-Policy",
            "require-corp"
          );
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          next();
        });
      },
    },
  ],
});
