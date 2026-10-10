import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import {fileURLToPath} from 'node:url'
import {readFileSync} from 'node:fs'
import {TDesignResolver} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import removeConsole from 'vite-plugin-remove-console'

// 直接读 package.json 而不用 JSON import：Vite 的 native config loader
// 对裸 JSON 导入有兼容限制，会输出告警。
const version = (
  JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')) as {
    version: string
  }
).version

// https://vite.dev/config/
export default defineConfig({
    base: '/', // 这里保持和你你的 GitHub 仓库名一致
    define: {
        __APP_VERSION__: JSON.stringify(version),
    },
    server: {
        host: process.env.VITE_HOST || '0.0.0.0',
    },
    plugins: [
        vue(),
        tailwindcss(),
        Components({
            dts: 'components.d.ts',
            resolvers: [
                TDesignResolver({
                    library: 'vue-next',    // Vue3 对应的包名：tdesign-vue-next
                    resolveIcons: true,     // 支持以 <xxx-icon /> 形式自动引入图标
                }),
            ],
        }),
        removeConsole({
            // 默认在生产环境移除console
            exclude: ['error', 'warn'], // 可选：保留 error 和 warn 信息
        }),
    ],
    resolve: {
        alias: {
            // ESM 环境下没有 __dirname，用 import.meta.url 推导绝对路径
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
