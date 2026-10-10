import {createApp} from 'vue'
import router from '@/router/index'
// TDesign 全局基础样式（含 --td-* 主题变量），必须在自定义样式之前引入
import 'tdesign-vue-next/es/style/index.css'
import './style.css'
import App from './App.vue'

createApp(App).use(router).mount('#app')
