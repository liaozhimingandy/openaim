<script setup lang="ts">
import {mission} from '@/config/content'
</script>

<template>
  <section id="mission" class="aim-section bg-bg-soft">
    <div class="aim-container">
      <div class="aim-section-head">
        <span class="aim-eyebrow" data-reveal>{{ mission.eyebrow }}</span>
        <h2 class="aim-title" data-reveal>{{ mission.title }}</h2>
        <p class="aim-lead" data-reveal>{{ mission.lead }}</p>
      </div>

      <div class="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
        <t-card
          v-for="item in mission.items"
          :key="item.title"
          class="flex h-full flex-col"
          size="small"
          hover-shadow
          data-reveal
        >
          <template #header>
            <div class="aim-card-head">
              <span class="aim-icon-box">
                <component :is="item.icon" size="20"/>
              </span>
              <h3 class="text-[17px] font-semibold text-ink-900">{{ item.title }}</h3>
            </div>
          </template>
          <p class="aim-desc">{{ item.desc }}</p>
        </t-card>
      </div>

      <!-- 阶段路线：先做应用，最后才谈基础模型 -->
      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div
          v-for="stage in mission.roadmap"
          :key="stage.phase"
          class="rounded-[12px] border border-line bg-white px-5 py-4"
          data-reveal
        >
          <div class="flex items-center gap-2.5 text-[13px] font-semibold text-brand-700">
            {{ stage.phase }}
            <span class="h-px flex-1 bg-line"></span>
          </div>
          <h4 class="mt-2 text-[16px] font-semibold text-ink-900">{{ stage.title }}</h4>
          <p class="mt-1.5 text-[13.5px] leading-[1.7] text-ink-500">{{ stage.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
