<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {BugOutlined, MailOutlined} from '@ant-design/icons-vue';

const items = [
  {
    key: 'home',
    href: '#home',
    title: '首页',
  },
  {
    key: 'target',
    href: '#target',
    title: '进展',
  },
  {
    key: 'aboutme',
    href: '#aboutme',
    title: '关于我们',
  },
];
const header = ref<any>(null);
const targetOffset = ref<number | undefined>(undefined);
onMounted(() => {
  targetOffset.value = header.value.$el.offsetHeight;
});
</script>

<template>
  <a-layout style="min-height: 100vh; text-align: center;">
    <a-layout-header ref="header" :style="{position: 'fixed', zIndex: 1, width: '100%',
    'background-color': 'white'}">
      <a-flex justify="space-between" align="center" style="height: 100%">
        <BugOutlined/>
        <a-anchor direction="horizontal" :items="items" :targetOffset="targetOffset" />
        <a-button href="mailto:liaozhimingandy@gg.com" type="primary">联系我们</a-button>
      </a-flex>
    </a-layout-header>
    <a-layout-content>
      <div id="home" class="content">
        <a-typography-title>和我们一起使用大语言模型(AI)造福人类!</a-typography-title>
      </div>
      <div id="target" class="content">
        <a-typography-title>我们正在寻找和我们有共同目标的朋友...</a-typography-title>
      </div>
      <div id="aboutme" class="content">
        <a-typography-title>一起加入我们吗?</a-typography-title>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center; background-color: white">
      ©{{ new Date().getFullYear()}} openaim.cn
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.content {
  align-content: center;
  height: 550px
}
</style>