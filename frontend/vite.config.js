import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
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
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            }
        }),
    ],
    envDir: '../', // Tell Vite to look for .env in the root directory
    resolve: {
        alias: {

            '@src': path.resolve(__dirname, './src'),
            'react': path.resolve(__dirname, './node_modules/react'),
            'firebase': path.resolve(__dirname, './node_modules/firebase'),
            'lucide-react': path.resolve(__dirname, './node_modules/lucide-react'),
        },
    },
    server: {
        port: 5173,
        fs: {
            allow: ['..']
        }
    }
})
