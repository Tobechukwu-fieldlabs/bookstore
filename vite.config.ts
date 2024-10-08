import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "@bangjelkoski/vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills({ protocolImports: true })],
  resolve: {
    alias: {
      // Polyfill Buffer for the browser
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
});
