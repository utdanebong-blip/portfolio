import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path, { dirname } from "path";
import dynamicImport from 'vite-plugin-dynamic-import';
import { fileURLToPath } from "url";
import { config } from "process";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const baseUrl = process.env.BASE_URL || '/portfolio'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  ...config,
  base: baseUrl,
   build: {
      outDir: 'build',
    },
     json: {
      namedExports: true,
    },
  plugins: [react(), dynamicImport(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    publicDir: './public',
  },
}));
