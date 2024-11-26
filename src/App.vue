<script setup lang="ts">
import zhCN from "ant-design-vue/lib/locale/zh_CN"; // 导入中文语言包

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

</script>

<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>

<style scoped>
/* 自定义进度条颜色 */
#nprogress .bar{
  background: #027AFF !important;
}
/* 自定义进度条位置 */
#nprogress .bar {
  height: 5px; /* 调整进度条的高度 */
  top: 0; /* 使进度条紧贴顶部 */
  position: fixed;
  left: 0;
  width: 100%;
}
</style>
