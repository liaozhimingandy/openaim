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

      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  </section>
</template>
