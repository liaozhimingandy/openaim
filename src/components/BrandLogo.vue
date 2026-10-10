<script setup lang="ts">
import {brandMarkPath} from '@/config/brand'

withDefaults(defineProps<{ size?: number }>(), {size: 32})
</script>

<template>
  <svg
    class="shrink-0 text-brand"
    :width="size"
    :height="size"
    viewBox="0 0 1024 1024"
    role="img"
    aria-label="OpenAIM"
  >
    <path :d="brandMarkPath" fill="currentColor"/>
  </svg>
</template>
