import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'prompt', // switched to prompt to control updates manually
            includeAssets: ['icon-192.png', 'icon-512.png', 'assets/*.png', 'assets/*.svg'],
            manifest: {
                name: 'Aditya Chavan | Senior Developer',
                short_name: 'Aditya.dev',
                description: 'Interactive Cyberpunk Portfolio of Aditya Chavan',
                theme_color: '#000000',
                background_color: '#000000',
                display: 'standalone',
                start_url: '/',
                orientation: 'portrait',
                icons: [
                    {
                        src: 'icon-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },
                    {
                        src: 'icon-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
                cleanupOutdatedCaches: true,
                skipWaiting: true,
                clientsClaim: true,
            },
            devOptions: {
                enabled: true
            }
        })
    ],
    envDir: '../', // Tell Vite to look for .env in the root directory
    resolve: {
        alias: {
            '@nexus': path.resolve(__dirname, '../Nexus/frontend'),
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
