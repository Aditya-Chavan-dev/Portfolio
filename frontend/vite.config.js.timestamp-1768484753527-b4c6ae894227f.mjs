// vite.config.js
import { defineConfig } from "file:///G:/PORTFOLIO/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///G:/PORTFOLIO/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///G:/PORTFOLIO/frontend/node_modules/vite-plugin-pwa/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "G:\\PORTFOLIO\\frontend";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Aditya Chavan | Portfolio",
        short_name: "Aditya",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        description: "Interactive System Portfolio",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        // Determine what to cache
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
      }
    })
  ],
  envDir: "../",
  // Tell Vite to look for .env in the root directory
  resolve: {
    alias: {
      "@src": path.resolve(__vite_injected_original_dirname, "./src"),
      "react": path.resolve(__vite_injected_original_dirname, "./node_modules/react"),
      "firebase": path.resolve(__vite_injected_original_dirname, "./node_modules/firebase"),
      "lucide-react": path.resolve(__vite_injected_original_dirname, "./node_modules/lucide-react")
    }
  },
  server: {
    port: 5173,
    fs: {
      allow: [".."]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFxQT1JURk9MSU9cXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkc6XFxcXFBPUlRGT0xJT1xcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovUE9SVEZPTElPL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xyXG5cclxuXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgVml0ZVBXQSh7XHJcbiAgICAgICAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICAgICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJBZGl0eWEgQ2hhdmFuIHwgUG9ydGZvbGlvXCIsXHJcbiAgICAgICAgICAgICAgICBzaG9ydF9uYW1lOiBcIkFkaXR5YVwiLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRfdXJsOiBcIi9cIixcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjMDAwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICB0aGVtZV9jb2xvcjogXCIjMDAwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcmFjdGl2ZSBTeXN0ZW0gUG9ydGZvbGlvXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIi9pY29uLTE5Mi5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXJwb3NlOiBcImFueSBtYXNrYWJsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCIvaWNvbi01MTIucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgd29ya2JveDoge1xyXG4gICAgICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHdoYXQgdG8gY2FjaGVcclxuICAgICAgICAgICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Z30nXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgZW52RGlyOiAnLi4vJywgLy8gVGVsbCBWaXRlIHRvIGxvb2sgZm9yIC5lbnYgaW4gdGhlIHJvb3QgZGlyZWN0b3J5XHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuXHJcbiAgICAgICAgICAgICdAc3JjJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgICAgICAgICdyZWFjdCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL25vZGVfbW9kdWxlcy9yZWFjdCcpLFxyXG4gICAgICAgICAgICAnZmlyZWJhc2UnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9ub2RlX21vZHVsZXMvZmlyZWJhc2UnKSxcclxuICAgICAgICAgICAgJ2x1Y2lkZS1yZWFjdCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QnKSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHBvcnQ6IDUxNzMsXHJcbiAgICAgICAgZnM6IHtcclxuICAgICAgICAgICAgYWxsb3c6IFsnLi4nXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UCxTQUFTLG9CQUFvQjtBQUNwUixPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBR3hCLE9BQU8sVUFBVTtBQUxqQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDSixjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxrQkFBa0I7QUFBQSxRQUNsQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDSDtBQUFBLFlBQ0ksS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ2I7QUFBQSxVQUNBO0FBQUEsWUFDSSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDYjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsTUFDQSxTQUFTO0FBQUE7QUFBQSxRQUVMLGNBQWMsQ0FBQyxnQ0FBZ0M7QUFBQSxNQUNuRDtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFFBQVE7QUFBQTtBQUFBLEVBQ1IsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BRUgsUUFBUSxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3ZDLFNBQVMsS0FBSyxRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLE1BQ3ZELFlBQVksS0FBSyxRQUFRLGtDQUFXLHlCQUF5QjtBQUFBLE1BQzdELGdCQUFnQixLQUFLLFFBQVEsa0NBQVcsNkJBQTZCO0FBQUEsSUFDekU7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDQSxPQUFPLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
