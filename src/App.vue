<script setup lang="ts">
import {ref} from 'vue';
import zhCN from 'tdesign-vue-next/es/locale/zh_CN'; // TDesign 中文语言包
import type {GlobalConfigProvider} from 'tdesign-vue-next';

// 语言包内部使用 readonly 数组声明，这里是已知的类型差异，做一次收敛即可
const globalConfig = ref<GlobalConfigProvider>(zhCN as unknown as GlobalConfigProvider);
</script>

<template>
  <t-config-provider :global-config="globalConfig">
    <router-view/>
  </t-config-provider>
</template>
