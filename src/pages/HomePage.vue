<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {CScrollbar} from 'c-scrollbar'; // 滚动条

const items = [
  {
    key: 'home',
    href: '#home',
    title: '首页',
  },
  {
    key: 'target',
    href: '#target',
    title: '目标',
  },
  {
    key: 'aboutme',
    href: '#aboutme',
    title: '关于我们',
  },
];
const header = ref<any>(null);
const content = ref<any>(null);
const footer = ref<any>(null);
const targetOffset = ref<number | undefined>(undefined);
const contentHeight = ref<number | undefined>(undefined);

const updateContentHeight = () => {
  targetOffset.value = header.value.$el.offsetHeight;
  contentHeight.value = window.innerHeight - footer.value.$el.offsetHeight - 6;
};

onMounted(async () => {
  window.addEventListener("resize", updateContentHeight);
  updateContentHeight();
});

onBeforeUnmount(async () => {
  window.removeEventListener("resize", updateContentHeight);
})
</script>

<template>
  <a-layout style="min-height: 100vh; text-align: center;">
    <a-layout-header ref="header" :style="{position: 'fixed', zIndex: 1, width: '100%',
      'background-color': 'white'}">
      <a-flex justify="space-between" align="center" style="height: 100%">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60">
          <rect width="140" height="60" fill="#cccccc"></rect>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="16px"
                fill="#333333">邀请你来设计LOGO
          </text>
        </svg>
        <a-anchor direction="horizontal" :items="items" :targetOffset="targetOffset"/>
        <a-button href="mailto:liaozhimingandy@gmail.com" type="primary">联系我们</a-button>
      </a-flex>
    </a-layout-header>
    <a-layout-content ref="content">
      <c-scrollbar
          trigger="hover"
          class="content"
      >
        <div id="home" class="content">
          <a-typography-title>通用人工智能(AI)时代已来临</a-typography-title>
        </div>
        <div id="target" class="content">
          <a-typography-title>和我们一起使用大语言模型(AI)造福人类!</a-typography-title>
        </div>
        <div id="aboutme" class="content">
          <a-typography-title>我们正在寻找和我们有共同目标的朋友...<br>一起加入我们吗?</a-typography-title>
        </div>
      </c-scrollbar>
    </a-layout-content>
    <a-layout-footer ref="footer" style="text-align: center; background-color: white">
      ©{{ new Date().getFullYear() }} openaim.cn
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.content {
  align-content: center;
  height: v-bind(contentHeight+ 'px');
}

</style>