import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ command, mode }) => {
  const assetOrigin = loadEnv(mode, process.cwd(), "VITE_").VITE_ASSET_ORIGIN?.trim();
  let base = "/";
  if (command === "build" && assetOrigin) {
    const url = new URL(assetOrigin);
    if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
      throw new Error("VITE_ASSET_ORIGIN must be an HTTPS origin without a path or credentials");
    }
    base = `${url.origin}/`;
  }
  return {
    plugins: [react()],
    base,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
  };
});
