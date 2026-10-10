<script setup lang="ts">
import {ArrowRightIcon, LogoGithubIcon, MailIcon} from 'tdesign-icons-vue-next'
import {join, joinMailto, siteConfig} from '@/config/content'
import {scrollToAnchor} from '@/composables/useSectionScroll'

interface StepOption {
  value: number
  title: string
  content: string
  /** StepStatus：全部标记完成，表示「走完这三步就开始」 */
  status: 'finish'
}

/** 加入流程交给 TDesign Steps 渲染 */
const stepOptions: StepOption[] = join.steps.map((step, index) => ({
  value: index,
  title: step.title,
  content: step.desc,
  status: 'finish',
}))
</script>

<template>
  <section id="join" class="aim-section">
    <div class="aim-container">
      <div class="aim-section-head">
        <span class="aim-eyebrow" data-reveal>{{ join.eyebrow }}</span>
        <h2 class="aim-title" data-reveal>{{ join.title }}</h2>
        <p class="aim-lead" data-reveal>{{ join.lead }}</p>
      </div>

      <div class="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-4">
        <t-card
          v-for="role in join.roles"
          :key="role.title"
          class="flex h-full flex-col"
          size="small"
          hover-shadow
          :body-style="{flex: 1}"
          data-reveal
        >
          <template #header>
            <div class="aim-card-head">
              <span class="aim-icon-box">
                <component :is="role.icon" size="20"/>
              </span>
              <h3 class="text-[16.5px] font-semibold text-ink-900">{{ role.title }}</h3>
            </div>
          </template>
          <p class="aim-desc-sm">{{ role.desc }}</p>
          <div class="mt-3.5 flex flex-wrap gap-1.5">
            <t-tag v-for="tag in role.tags" :key="tag" size="small" variant="light">
              {{ tag }}
            </t-tag>
          </div>
        </t-card>
      </div>

      <!-- 加入流程 -->
      <div class="mt-8 rounded-[14px] border border-line bg-brand-soft-2 p-6 py-5" data-reveal>
        <t-steps layout="horizontal" separator="arrow" :options="stepOptions"/>
      </div>

      <!-- 最后的行动区 -->
      <t-card class="mt-6" size="small" data-reveal>
        <div class="flex flex-wrap items-center justify-between gap-5 max-md:flex-col max-md:items-start">
          <div>
            <h3 class="text-[clamp(20px,2.2vw,26px)] font-bold text-ink-900">
              {{ join.ctaTitle }}
            </h3>
            <p class="mt-2 text-[14.5px] text-ink-500">{{ join.ctaDesc }}</p>
            <p class="mt-2.5 flex items-center gap-2 text-sm text-brand-700">
              <MailIcon class="text-brand" size="16"/>
              {{ siteConfig.email }}
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <t-button size="large" theme="primary" :href="joinMailto">
              {{ join.ctaPrimary }}
              <template #suffix>
                <ArrowRightIcon size="16"/>
              </template>
            </t-button>
            <t-button size="large" variant="outline" @click="scrollToAnchor('research')">
              {{ join.ctaSecondary }}
            </t-button>
            <t-button
              v-if="siteConfig.githubUrl"
              size="large"
              variant="text"
              :href="siteConfig.githubUrl"
              target="_blank"
              rel="noopener"
            >
              <template #icon>
                <LogoGithubIcon size="16"/>
              </template>
              GitHub
            </t-button>
          </div>
        </div>
      </t-card>
    </div>
  </section>
</template>
