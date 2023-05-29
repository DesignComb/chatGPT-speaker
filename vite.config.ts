import path from "path";

import {defineConfig} from 'vite'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'url'

import vue from '@vitejs/plugin-vue'

import vueI18n from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        vueI18n({
            // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
            // compositionOnly: false,

            // you need to set i18n resource including paths !
            include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
        })],
    resolve: {
        alias: {
            "@/": `${path.resolve(__dirname, "src")}/`,
        },
    },
    server:{
        host:'localhost',
        port:3000,
        proxy:{
            // '/api': 'http://your-host'
        }
    }
})
