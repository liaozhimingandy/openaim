import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';

// 引入nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css' // 引入样式

import NotFoundPage from "../pages/NotFoundPage.vue";
import HomePage from "../pages/HomePage.vue";

// 进度条配置：只有 nprogress 支持的选项才有效，颜色请在 style.css 中调整
NProgress.configure({
    speed: 2000,            // 进度条增加的速度
    minimum: 0.08,          // 进度条开始时的最小百分比
    easing: 'ease',         // 动画的缓动效果
    trickle: false,         // 是否在顶部显示自动递增的小进度条
    trickleSpeed: 200,      // 顶部小进度条的更新速度
    showSpinner: false,     // 不显示默认的加载小图标
    positionUsing: '',      // 空字符串表示使用 top/left 定位
});

import {siteConfig} from '../config/content';

const SITE_NAME = siteConfig.name;
const DEFAULT_TITLE = `${siteConfig.name} · ${siteConfig.slogan}`;

const routes: RouteRecordRaw[] = [
    {path: '/', name: 'home', component: HomePage},
    // vue-router 的捕获所有写法，注意 key 名必须是 pathMatch
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage,
        meta: {title: 'Not Found'},
    },
]

const router = createRouter({
    // 内部提供了 history 模式的实现
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes, // `routes: routes` 的缩写
});

router.beforeEach((to, _from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
    // 开始进度条
    NProgress.start();

    // 如果路径不是以 / 结尾，则统一跳转过去，同时保留 query 与 hash
    if (!to.path.endsWith('/')) {
        next({path: to.path + '/', query: to.query, hash: to.hash});
    } else {
        next();
    }
})

router.afterEach((to) => {
    // 完成进度条
    NProgress.done();

    const title = typeof to.meta.title === 'string' ? to.meta.title : '';
    document.title = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
});

export default router;
