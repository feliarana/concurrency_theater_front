import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Concu Tickets",
        short_name: "Concu Tickets",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "favicon.ico",
            sizes: "225x225",
            type: "image/x-icon",
          },
        ],
      },
      registerType: "autoUpdate",
      order: "before",
      handler: "auto",
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        favicon: '/public/favicon.ico'
      }
    }
  }
});
