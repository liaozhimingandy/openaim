<script lang="ts" setup>
</script>

<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <router-link :to="{name: 'home'}">
        <a-button type="primary">返回到首页</a-button>
      </router-link>
    </template>
  </a-result>
</template>

<style scoped>
</style>