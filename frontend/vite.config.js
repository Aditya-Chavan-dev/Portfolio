import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),

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
