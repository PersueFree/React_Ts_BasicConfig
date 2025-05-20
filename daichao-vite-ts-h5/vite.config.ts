import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import autoprefixer from "autoprefixer";
// import { analyzer } from "vite-bundle-analyzer";
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 8087,
    host: true,
    open: true,
    proxy: {
      "/ph-vamo": {
        // http://8.212.152.160/ph-vamo
        target: "http://8.212.152.160/ph-vamo",
        changeOrigin: true,
      rewrite: (path) => path.replace(/^\/ph-vamo/, ""),
      }
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: 'assets',
    emptyOutDir: true,
    minify: "terser",
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      // external: ["styled-components"], // 避免重复打包styled-components
      output: {
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-[hash].js",
        assetFileNames: (asset) => {
          if (asset.name?.endsWith(".css")) {
            return "css/[name]-[hash].css";
          } else {
            const extType = asset.name?.split('.')[1] || "";
            if (/png|jpe?g|svg|gif|webp/i.test(extType)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(extType)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return "assets/[name]-[hash].[ext]";
          }
        },
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          antd: ["antd-mobile"],
          axios: ["axios"]
        }
      }
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  },
  plugins: [react({
    include: /\.(jsx|tsx)$/,
    babel: {
      plugins: [
        [
          "babel-plugin-styled-components",
          {
            ssr: false,
            pure: true,
            minify: false,
            displayName: true,
            fileName: false,
          },
        ],
      ],
      babelrc: false,
      configFile: false
    }
  }),
  tsconfigPaths({ loose: true }),
  legacy(),
  // analyzer(),
],
});
