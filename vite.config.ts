import {fileURLToPath, URL} from 'node:url'
import {resolve, dirname} from 'node:path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from "@tailwindcss/vite";
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import {nodePolyfills} from "vite-plugin-node-polyfills";
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        nodePolyfills({
            include: ['path'],
        }),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
