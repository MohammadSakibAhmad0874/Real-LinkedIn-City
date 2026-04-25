// vite.config.js
import { defineConfig } from "file:///C:/Users/Ghosty/Desktop/LinkedIn-City-main/LinkedIn-City-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Ghosty/Desktop/LinkedIn-City-main/LinkedIn-City-main/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      name: "spa-fallback",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const url = req.url?.split("?")[0] ?? "";
          const isViteInternal = url.startsWith("/@") || url.startsWith("/node_modules");
          const isAsset = url.includes(".");
          const isApi = url.startsWith("/api");
          if (!isViteInternal && !isAsset && !isApi && url !== "/") {
            req.url = "/";
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3e3,
    strictPort: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxHaG9zdHlcXFxcRGVza3RvcFxcXFxMaW5rZWRJbi1DaXR5LW1haW5cXFxcTGlua2VkSW4tQ2l0eS1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxHaG9zdHlcXFxcRGVza3RvcFxcXFxMaW5rZWRJbi1DaXR5LW1haW5cXFxcTGlua2VkSW4tQ2l0eS1tYWluXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9HaG9zdHkvRGVza3RvcC9MaW5rZWRJbi1DaXR5LW1haW4vTGlua2VkSW4tQ2l0eS1tYWluL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAge1xuICAgICAgbmFtZTogJ3NwYS1mYWxsYmFjaycsXG4gICAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG4gICAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoKHJlcSwgX3JlcywgbmV4dCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHVybCA9IHJlcS51cmw/LnNwbGl0KCc/JylbMF0gPz8gJyc7XG4gICAgICAgICAgY29uc3QgaXNWaXRlSW50ZXJuYWwgPSB1cmwuc3RhcnRzV2l0aCgnL0AnKSB8fCB1cmwuc3RhcnRzV2l0aCgnL25vZGVfbW9kdWxlcycpO1xuICAgICAgICAgIGNvbnN0IGlzQXNzZXQgPSB1cmwuaW5jbHVkZXMoJy4nKTtcbiAgICAgICAgICBjb25zdCBpc0FwaSA9IHVybC5zdGFydHNXaXRoKCcvYXBpJyk7XG5cbiAgICAgICAgICBpZiAoIWlzVml0ZUludGVybmFsICYmICFpc0Fzc2V0ICYmICFpc0FwaSAmJiB1cmwgIT09ICcvJykge1xuICAgICAgICAgICAgcmVxLnVybCA9ICcvJztcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVgsU0FBUyxvQkFBb0I7QUFDbFosT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixnQkFBZ0IsUUFBUTtBQUN0QixlQUFPLFlBQVksSUFBSSxDQUFDLEtBQUssTUFBTSxTQUFTO0FBQzFDLGdCQUFNLE1BQU0sSUFBSSxLQUFLLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSztBQUN0QyxnQkFBTSxpQkFBaUIsSUFBSSxXQUFXLElBQUksS0FBSyxJQUFJLFdBQVcsZUFBZTtBQUM3RSxnQkFBTSxVQUFVLElBQUksU0FBUyxHQUFHO0FBQ2hDLGdCQUFNLFFBQVEsSUFBSSxXQUFXLE1BQU07QUFFbkMsY0FBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxTQUFTLFFBQVEsS0FBSztBQUN4RCxnQkFBSSxNQUFNO0FBQUEsVUFDWjtBQUNBLGVBQUs7QUFBQSxRQUNQLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
