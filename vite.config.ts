import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import {fileURLToPath} from 'node:url'
import {existsSync, readFileSync} from 'node:fs'
import {join} from 'node:path'
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

/** 主题色兜底值：.env 里没配或配错了就用它 */
const DEFAULT_THEME_COLOR = '#1296db'
const COLOR_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i

const ENV_DIR = fileURLToPath(new URL('.', import.meta.url))

/**
 * 直接从 .env 里把 VITE_THEME_COLOR 抠出来。
 *
 * 为什么需要它：Vite 用 dotenv 解析 .env，而 dotenv 把 `#` 视为行内注释起点，
 * 于是 `VITE_THEME_COLOR=#ff0000` 会被解析成空字符串（实测 loadEnv 返回 ""）。
 * 这里手动再读一次，让不带引号的 hex 也能生效。
 */
function readThemeColorFromEnvFile(): string | undefined {
  for (const name of ['.env', '.env.local']) {
    const file = join(ENV_DIR, name)
    if (!existsSync(file)) continue

    const matched = readFileSync(file, 'utf-8').match(
      /^\s*VITE_THEME_COLOR\s*=\s*["']?([^"'\r\n]+?)["']?\s*$/m,
    )
    if (matched) return matched[1].trim()
  }
  return undefined
}

/** 读取主题色：优先用 loadEnv，取不到再回退到手动解析，最后才用默认值 */
function resolveThemeColor(env: Record<string, string>): string {
  // 分两步写：rolldown 不允许 ?? 与 || 混用（会报 PARSE_ERROR）
  const fromEnv = (env.VITE_THEME_COLOR ?? '').trim()
  const fromFile = readThemeColorFromEnvFile() ?? ''
  const raw = (fromEnv || fromFile).trim()

  if (!raw) return DEFAULT_THEME_COLOR

  // 允许写成 ff0000 或 #ff0000
  const color = raw.startsWith('#') ? raw : `#${raw}`

  if (!COLOR_PATTERN.test(color)) {
    console.warn(
      `[openaim] VITE_THEME_COLOR="${raw}" 不是合法的 hex 颜色，已回退为 ${DEFAULT_THEME_COLOR}`,
    )
    return DEFAULT_THEME_COLOR
  }
  return color
}

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, ENV_DIR, 'VITE_')
    const themeColor = resolveThemeColor(env)

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
