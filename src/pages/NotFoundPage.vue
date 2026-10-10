<script setup lang="ts">
import {MailIcon} from 'tdesign-icons-vue-next'
import BrandLogo from '@/components/BrandLogo.vue'
import {siteConfig} from '@/config/content'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-3 bg-white px-5 py-10 text-center">
    <BrandLogo :size="46"/>

    <p class="mt-4.5 text-[clamp(64px,12vw,104px)] font-bold leading-none tracking-tight text-brand">
      404
    </p>

    <h1 class="text-[clamp(20px,2.6vw,26px)] font-bold text-ink-900">这个页面走丢了</h1>

    <p class="max-w-[460px] text-[15px] text-ink-500">
      你访问的页面不存在，可能已经被移动或者改名了。不如回到首页看看我们在做什么？
    </p>

    <div class="mt-5 flex flex-wrap justify-center gap-3">
      <router-link :to="{name: 'home'}">
        <t-button theme="primary" size="large">返回到首页</t-button>
      </router-link>
      <t-button variant="outline" size="large" :href="`mailto:${siteConfig.email}`">
        <template #icon>
          <MailIcon size="16"/>
        </template>
        告诉我们坏掉的链接
      </t-button>
    </div>
  </div>
</template>
