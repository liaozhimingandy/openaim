# OpenAIM

> 开源大模型应用小组 —— 我们在做的事，和我们需要的人

在线站点：<https://www.openaim.cn>

想让更多志同道合的人一起把开源大模型用起来，同时也把我们做出来的东西展示出来。
所以这个仓库是两件事：一个**招募落地页**，一个**产品橱窗**。

目前处于起步阶段，文案刻意保持了克制：只说正在做什么、缺什么人，不做夸大。

### 路线定位（改文案时请保持一致）

基础模型预训练成本太高，现阶段明确不做。全站口径统一为三段：

| 阶段 | 做什么 |
| --- | --- |
| 现在 | 基于已有开源大模型做**二次开发与产品化**，先解决日常需求 |
| 接下来 | 积累微调经验，把**语音 / 图像 / 多模态**能力接进应用 |
| 以后 | 团队与算力都够了再考虑自研基础模型，现在不画这个饼 |

四类模型（语音、文本、图像、多模态）是这个定位的主线，产品区与研究区都按它组织。

---

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | Vue 3.5（Composition API + `<script setup>`） |
| 语言 | TypeScript（strict） |
| 构建 | Vite 8 |
| 样式 | **Tailwind CSS 4**（CSS-first 配置，写在 `src/style.css`） |
| UI 组件 | **TDesign Vue Next**（由 Ant Design Vue 迁移而来） |
| 图标 | tdesign-icons-vue-next |
| 路由 | Vue Router 5 |
| 状态 / 请求 | Pinia / Axios（尚未接入，按需使用） |
| 包管理 | pnpm 10 |

组件按需引入由 `unplugin-vue-components`（TDesignResolver）完成，
因此模板里可以直接写 `<t-card>`、`<t-button>`、`<t-steps>`，无需手动 import。

## 样式分工

三者各管一段，尽量不越界：

| 层 | 负责什么 | 在哪 |
| --- | --- | --- |
| Tailwind | 布局、间距、字号、颜色等一切视觉排版 | utility class 直接写在模板里 |
| `@theme` 令牌 | 品牌色 / 中性色，生成 `text-brand`、`bg-bg-soft` 这类 utility | `src/style.css` 顶部 |
| `@layer components` | 少数高复用的语义类（`aim-container`、`aim-title`、`aim-icon-box`…） | `src/style.css` |
| TDesign | 交互组件（Card / Button / Tag / Steps / Input / Divider / Space） | 按需引入 |

> **为什么布局不用 `t-row` / `t-col`？**
> TDesign 的栅格是 **12 栏**（不是 Ant Design 习惯的 24 栏），按 24 写就会宽度溢出、整块堆叠；
> 再者 Card 想要一行内等高、footer 贴底，需要 CSS Grid 的 `stretch` 行为。
> Tailwind 的 `grid gap-5 md:grid-cols-2 xl:grid-cols-4` 更直观也更可控。

### 卡片等高与 footer 贴底

区块内的卡片统一写成这样（改的时候照抄即可）：

```html
<!-- 无 footer 的卡片 -->
<t-card class="flex h-full flex-col" size="small" hover-shadow>

<!-- 有 footer、希望按钮贴底的卡片 -->
<t-card class="flex h-full flex-col" size="small" hover-shadow :body-style="{flex: 1}">
```

两个条件缺一不可：`h-full` 让卡片撑满 grid 单元，
`flex flex-col` + `body-style` 让 body 吃掉剩余高度把 footer 顶到底部
（`.t-card` 默认不是 flex 容器，只写 `body-style` 是不生效的）。

顺带：卡片网格再加 `auto-rows-fr`，跨行的卡片也会等高（否则只有同一行内对齐）。

### 一屏一节

每个区块都带 `.aim-section`，它的两条关键规则在 `src/style.css`：

```css
.aim-section {
  min-height: calc(100svh - var(--spacing-header)); /* 视口高 - 吸顶导航 64px */
  ...
}
.aim-section > * { margin-block: auto; }  /* 内容在剩余高度里垂直居中 */
```

于是点击导航跳转后，视口里除顶部导航栏外只剩目标区块本身。

三个坑，改布局时别踩：

1. **用 `svh` 不用 `vh`** —— 移动端地址栏收起/展开时 `vh` 会跳变，`svh` 取稳定值。
2. **居中用 auto margin，不用 `justify-content: center`** —— 内容超过一屏时后者会把
   溢出的上半截推到滚动区之外，永远滚不到；auto margin 在无剩余空间时自动归零。
   （`justify-content: safe center` 也能解决，但兼容性不如 auto margin，
   而且 CSS 压缩器会把它的回退声明合并掉，等于没有降级。）
3. **区块只能有一个直接子元素**（就是那个 `.aim-container`），否则 auto margin
   会在多个子元素之间平分空间。

## 快速开始

```bash
pnpm install
pnpm dev        # 本地开发
pnpm build      # 生产构建，产物在 dist/
pnpm preview    # 本地预览构建产物
```

提交前建议跑一次类型检查（项目根目录的 `tsconfig.json` 是 project references 结构，
必须显式指定子配置，否则 `vue-tsc` 不会真正检查任何文件）：

```bash
pnpm exec vue-tsc --noEmit -p tsconfig.app.json
```

## 目录结构

```
src/
├── App.vue                     # 根组件：TDesign ConfigProvider（中文语言包）
├── main.ts                     # 应用入口（引入 TDesign 主题变量 + Tailwind）
├── style.css                   # Tailwind 入口 + 设计令牌 + 复用语义类
├── router/index.ts             # 路由配置 + NProgress 进度条
├── config/
│   ├── content.ts              # 【改文案看这里】全站文案与数据结构
│   └── brand.ts                # 品牌 logo 的 SVG path（需与 public/favicon.svg 同步）
├── composables/
│   ├── useActiveSection.ts     # 导航高亮：跟随滚动位置计算当前区块
│   ├── useScrollReveal.ts      # 滚动进场动画（作用于所有 data-reveal 元素）
│   └── useSectionScroll.ts     # 区块平滑滚动（自动扣除吸顶 Header 高度）
├── components/
│   ├── BrandLogo.vue           # 品牌标识（图形数据来自 config/brand.ts）
│   └── home/                   # 首页各区块组件
│       ├── SiteHeader.vue      #   吸顶导航（含滚动高亮、移动端菜单）
│       ├── HeroSection.vue     #   首屏：主张 + 行动点 + 产品预览
│       ├── MissionSection.vue  #   我们在做什么（3 列）
│       ├── ProductsSection.vue #   产品展示（4 列）
│       ├── ResearchSection.vue #   研究方向（2 列）
│       ├── JoinSection.vue     #   加入我们（角色 4 列 + 流程 + 联系入口）
│       └── SiteFooter.vue      #   页脚（3 列）
└── pages/
    ├── HomePage.vue            # 首页：组合以上区块
    └── NotFoundPage.vue        # 404
```

## 页面结构

首页由上到下依次是：**Hero → 我们在做什么 → 产品 → 研究方向 → 加入我们 → 页脚**。

各区块的列数（都以容器 1200px 为准）：

| 区块 | < 768px | ≥ 768px | ≥ 1024px | ≥ 1280px |
| --- | --- | --- | --- | --- |
| Footer 三列 | 1 列 | 6 / 3 / 3 | 5 / 3 / 4 | 同左 |
| 我们在做什么 | 1 列 | 2 列 | 3 列 | 3 列 |
| 产品 | 1 列 | 2 列 | 2 列 | 4 列 |
| 研究方向 | 1 列 | 2 列 | 2 列 | 2 列 |
| 招募角色 | 1 列 | 2 列 | 2 列 | 4 列 |

### 用到的 TDesign 组件

| 位置 | 组件 |
| --- | --- |
| 区块卡片 | `t-card`（`hover-shadow` + `header` / `footer` 插槽） |
| 加入流程 | `t-steps`（`options` + `separator="arrow"`） |
| 状态、能力点、聊天示例 | `t-tag`（`variant` / `theme` / `shape`） |
| 按钮 | `t-button`（`theme` / `variant` / `shape` / `size`） |
| 产品卡底部输入框（示意） | `t-input` |
| 分隔与间距 | `t-divider` / `t-space` |

**注意**：TDesign 1.20 已移除 `Result` 组件，404 页是自行绘制的。

### 主题联动

`src/style.css` 里把 TDesign 的主色 token（`--td-brand-color-1` ~ `-10`）接到了站点品牌色上，
所以 Button / Tag / Input 等组件的颜色会跟着 `--color-brand` 走，不需要逐个覆写。

三处主色必须保持一致：

- `public/favicon.svg` 图形颜色
- `.env` 中的 `VITE_THEME_COLOR`
- `src/style.css` 里 `@theme` 的 `--color-brand`

（当前均为 `#1296db`。）

## 日常维护

**改文案**：全部集中在 `src/config/content.ts`，里面有 `hero`（首屏）、`mission`、
`products`（产品）、`research`（研究方向）、`join`（招募）等，改完刷新即可，不需要动组件。

**改配色**：`src/style.css` 顶部 `@theme` 里的 `--color-*`；Tailwind 会自动生成对应的 utility。

**改 logo**：替换 `public/favicon.svg` 后，同步更新 `src/config/brand.ts` 里的 path 数据，
站点内的 `BrandLogo.vue` 会自动跟上。

**加区块**：复制 `src/components/home/` 下任一区块组件 → 在 `HomePage.vue` 中引入 →
把导航项追加到 `content.ts` 的 `navItems`（导航高亮与移动端菜单会自动生效）。
需要淡入动画的元素加 `data-reveal` 属性即可。

### 待补全的真实信息

`src/config/content.ts` 中带 `TODO` 标记的位置请替换：

- `siteConfig.githubUrl`：社区 / 代码仓库地址（留空则不显示 GitHub 按钮）
- `products[].href`：各产品的线上地址（留空则显示「尚未开放访问」）
- `products[].status` / `statusTheme`：按真实进展调整（目前写的是起步中 / 早期开发 / 规划中）
- `siteConfig.stageNote`：阶段说明，会显示在首屏标签和页脚

## Ant Design Vue → TDesign 迁移要点

1. **依赖替换**：移除 `ant-design-vue`、`@ant-design/icons-vue`，改用
   `tdesign-vue-next` + `tdesign-icons-vue-next`；`vite.config.ts` 中的 resolver
   由 `AntDesignVueResolver` 换成 `TDesignResolver({ library: 'vue-next' })`。
2. **全局配置**：`<a-config-provider :locale>` → `<t-config-provider :global-config>`。
3. **样式变量**：需要显式引入 `import 'tdesign-vue-next/es/style/index.css'`
   （已在 `main.ts` 中引入），它只含 `--td-*` 主题变量，不含组件样式，体积很小。
4. **pnpm 构建脚本**：pnpm 10 默认不执行依赖的构建脚本，已在 `package.json` 中通过
   `pnpm.onlyBuiltDependencies` 放行 `esbuild`，否则 Vite 无法启动。
5. **路由**：Vue Router 5 要求 Vite ≥ 7.3，因此 Vite 与路由版本需一起升级；
   404 捕获路由使用标准写法 `/:pathMatch(.*)*`。

## 部署

GitHub Actions 会在推送到主分支后自动构建并发布到 GitHub Pages（见 `.github/workflows/deploy.yml`），
自定义域名写死在仓库根目录的 `CNAME` 里。
