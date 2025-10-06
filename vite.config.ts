import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"
import { VitePWA } from "vite-plugin-pwa"
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            srcDir: "src",
            filename: "sw.ts",
            strategies: "injectManifest",
            injectManifest: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
            },
            devOptions: {
                enabled: true,
                type: "module",
            },
            manifest: {
                theme_color: "#405F90",
                background_color: "#F9F9FF",
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
                orientation: "portrait",
                display: "standalone",
                dir: "ltr",
                lang: "ru-RU",
                name: "Расписание КИТЭКа",
                short_name: "Расписание",
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
