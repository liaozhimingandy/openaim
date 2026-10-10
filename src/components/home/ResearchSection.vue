<script setup lang="ts">
import {research} from '@/config/content'
</script>

<template>
  <section id="research" class="aim-section bg-bg-soft">
    <div class="aim-container">
      <div class="aim-section-head">
        <span class="aim-eyebrow" data-reveal>{{ research.eyebrow }}</span>
        <h2 class="aim-title" data-reveal>{{ research.title }}</h2>
        <p class="aim-lead" data-reveal>{{ research.lead }}</p>
      </div>

      <!-- 6 个方向按两列铺开，共三行 -->
      <div class="grid auto-rows-fr gap-4 md:grid-cols-2">
        <t-card
          v-for="item in research.items"
          :key="item.title"
          class="flex h-full flex-col"
          size="small"
          hover-shadow
          data-reveal
        >
          <template #header>
            <div class="aim-card-head">
              <span class="aim-icon-box-sm">
                <component :is="item.icon" size="18"/>
              </span>
              <h3 class="text-base font-semibold text-ink-900">{{ item.title }}</h3>
            </div>
          </template>
          <p class="aim-desc-sm">{{ item.desc }}</p>
        </t-card>
      </div>
    </div>
  </section>
</template>
