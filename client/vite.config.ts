import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // Force relative paths
  server: { host: true },
  plugins: [react()],
});
