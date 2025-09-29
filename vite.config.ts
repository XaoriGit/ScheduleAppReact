import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"
import { VitePWA } from "vite-plugin-pwa"
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            workbox: { globPatterns: ["**/*{html,css,js,ico,png,svg}"] },
            manifest: {
                theme_color: "#111318",
                background_color: "#111318",
                icons: [
                    {
                        purpose: "maskable",
                        sizes: "512x512",
                        src: "icon512_maskable.png",
                        type: "image/png",
                    },
                    {
                        purpose: "any",
                        sizes: "512x512",
                        src: "icon512_rounded.png",
                        type: "image/png",
                    },
                ],
                screenshots: [
                    {
                        src: "/screenshots/desktop.png",
                        type: "image/png",
                        sizes: "1502x758",
                        form_factor: "wide",
                    },
                    {
                        src: "/screenshots/mobile.png",
                        type: "image/png",
                        sizes: "1082x2402",
                        form_factor: "narrow",
                    },
                ],
                orientation: "any",
                display: "standalone",
                lang: "ru-RU",
                name: "Расписание КИТЭК",
                short_name: "Расписание КИТЭК",
            },
        }),
        tsconfigPaths(),
        svgr(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
        @use "@/app/typography.scss" as *;
      `,
            },
        },
    },
})
