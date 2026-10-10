<script setup lang="ts">
import {ArrowRightIcon, ChatIcon, CheckCircleIcon} from 'tdesign-icons-vue-next'
import {hero, heroPreview, joinMailto} from '@/config/content'
import {scrollToAnchor} from '@/composables/useSectionScroll'

type PreviewMessage = (typeof heroPreview.messages)[number]

const isAi = (message: PreviewMessage) => message.role === 'ai'
</script>

<template>
  <section id="home" class="aim-section relative overflow-hidden">
    <div
      class="aim-container grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12"
    >
      <!-- 左侧：主张 + 行动点 -->
      <div>
        <t-tag theme="primary" variant="light" size="medium" shape="round" data-reveal>
          {{ hero.badge }}
        </t-tag>

        <h1
          class="mt-4.5 text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.25] tracking-tight text-ink-900"
          data-reveal
        >
          {{ hero.titlePrefix }}
          <span class="text-brand">{{ hero.titleHighlight }}</span>
        </h1>

        <p class="mt-4.5 max-w-[560px] text-[clamp(14.5px,1.4vw,16.5px)] text-ink-500" data-reveal>
          {{ hero.lead }}
        </p>

        <ul class="mt-5.5 grid gap-2.5">
          <li
            v-for="point in hero.points"
            :key="point"
            class="flex items-start gap-2.5 text-[14.5px] text-ink-700"
            data-reveal
          >
            <CheckCircleIcon class="mt-0.5 shrink-0 text-brand" size="18"/>
            <span>{{ point }}</span>
          </li>
        </ul>

        <div class="mt-7 flex flex-wrap gap-3" data-reveal>
          <t-button size="large" theme="primary" :href="joinMailto">
            {{ hero.primaryAction }}
            <template #suffix>
              <ArrowRightIcon size="16"/>
            </template>
          </t-button>
          <t-button size="large" variant="outline" @click="scrollToAnchor('mission')">
            {{ hero.secondaryAction }}
          </t-button>
        </div>
      </div>

      <!-- 右侧：产品界面示意（非真实截图） -->
      <div class="max-lg:max-w-[540px]" data-reveal>
        <t-card size="small" :body-style="{padding: '14px'}">
          <template #header>
            <div class="flex items-center gap-2 text-[13.5px] text-ink-700">
              <ChatIcon class="shrink-0 text-brand" size="15"/>
              <span class="font-semibold">{{ heroPreview.title }}</span>
              <t-tag theme="primary" variant="light" size="small" shape="round">
                {{ heroPreview.status }}
              </t-tag>
            </div>
          </template>

          <div class="grid gap-2.5">
            <div
              v-for="(message, index) in heroPreview.messages"
              :key="index"
              class="max-w-[90%] px-3.5 py-2.5 text-[13.5px] leading-[1.65]"
              :class="
                isAi(message)
                  ? 'rounded-xl rounded-bl-sm border border-line-soft bg-brand-soft-2 text-ink-700'
                  : 'ml-auto rounded-xl rounded-br-sm bg-brand text-white'
              "
            >
              {{ message.text }}
            </div>

            <div class="mt-0.5 flex flex-wrap gap-1.5">
              <t-tag v-for="chip in heroPreview.chips" :key="chip" size="small" variant="outline">
                {{ chip }}
              </t-tag>
            </div>
          </div>

          <template #footer>
            <t-input readonly size="small" :placeholder="heroPreview.placeholder"/>
          </template>
        </t-card>
      </div>
    </div>
  </section>
</template>
