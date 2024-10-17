import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "ConcuTickets",
        short_name: "ConcuTickets",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          // ... otras resoluciones de icono
        ],
      },
      registerType: "autoUpdate",
      order: "before",
      handler: "auto",
    }),
  ],
});
