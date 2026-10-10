import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import {fileURLToPath} from 'node:url'
import {readFileSync} from 'node:fs'
import {TDesignResolver} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import removeConsole from 'vite-plugin-remove-console'
import process from "node:process";

// 直接读 package.json 而不用 JSON import：Vite 的 native config loader
// 对裸 JSON 导入有兼容限制，会输出告警。
const version = (
  JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')) as {
    version: string
  }
).version

/** 主题色兜底值：.env 里没配或配错了就用它 */
const DEFAULT_THEME_COLOR = '#002aff'

// https://vite.dev/config/
export default defineConfig( ({mode}) => {
    const env = loadEnv(mode, process.cwd());
    const themeColor = env.VITE_THEME_COLOR ?? DEFAULT_THEME_COLOR;

    return {
        base: '/', // 这里保持和你你的 GitHub 仓库名一致
        define: {
            __APP_VERSION__: JSON.stringify(version),
        },
        server: {
            host: process.env.VITE_HOST || '0.0.0.0',
        },
        plugins: [
        {
            /**
             * 把 .env 的 VITE_THEME_COLOR 注入页面。
             * 用 html:root 而不是 :root —— Tailwind 的 @theme 变量也挂在 :root 上，
             * 选择器权重更高才能保证覆盖（不受样式插入顺序影响）。
             * 覆盖 --color-brand 后，style.css 里所有 color-mix 派生的色阶、
             * 以及 TDesign 的 --td-brand-color-* 会一起跟着变。
             */
            name: 'openaim-theme-color',
            transformIndexHtml: {
                order: 'pre',
                handler: (html: string) => ({
                    html: html.replace(
                        /(<meta name="theme-color" content=")[^"]*(")/,
                        `$1${themeColor}$2`,
                    ),
                    tags: [
                        {
                            tag: 'style',
                            attrs: {id: 'theme-color-vars'},
                            children: `html:root{--color-brand:${themeColor}}`,
                            injectTo: 'head',
                        },
                    ],
                }),
            },
        },
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
    }
})
