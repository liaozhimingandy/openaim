<script setup lang="ts">
import {LogoGithubIcon, MailIcon} from 'tdesign-icons-vue-next'
import BrandLogo from '@/components/BrandLogo.vue'
import {navItems, siteConfig} from '@/config/content'
import {scrollToAnchor} from '@/composables/useSectionScroll'

const currentYear = new Date().getFullYear()
const appVersion = __APP_VERSION__
</script>

<template>
  <footer class="border-t border-line bg-bg-soft py-14 text-ink-500 max-md:py-10">
    <div class="aim-container">
      <!-- 三列并排：md 时 6 / 3 / 3，lg 时 5 / 3 / 4（合计 12 栏） -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        <div class="md:col-span-6 lg:col-span-5">
          <div class="flex items-center gap-2.5">
            <BrandLogo :size="30"/>
            <span class="text-lg font-bold text-ink-900">
              {{ siteConfig.name }}<em class="not-italic text-brand">.cn</em>
            </span>
          </div>
          <p class="mt-3.5 max-w-[420px] aim-desc-sm">{{ siteConfig.description }}</p>
          <div class="mt-2.5 flex flex-wrap items-center">
            <t-button variant="text" theme="primary" :href="`mailto:${siteConfig.email}`">
              <template #icon>
                <MailIcon size="16"/>
              </template>
              {{ siteConfig.email }}
            </t-button>
            <t-button
              v-if="siteConfig.githubUrl"
              variant="text"
              theme="primary"
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

        <nav class="flex flex-col items-start gap-2 md:col-span-3" aria-label="页脚导航">
          <h4 class="mb-1 text-sm font-semibold text-ink-900">导航</h4>
          <a
            v-for="item in navItems"
            :key="item.key"
            class="text-sm text-ink-500 transition-colors hover:text-brand-700"
            href="#"
            @click.prevent="scrollToAnchor(item.anchor)"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="md:col-span-3 lg:col-span-4">
          <h4 class="mb-3 text-sm font-semibold text-ink-900">当前进度</h4>
          <p class="text-sm text-ink-700">{{ siteConfig.stageNote }}</p>
          <p class="mt-2 text-[13.5px] leading-[1.8] text-ink-400">
            我们还在很早的阶段。如果你愿意一起，写封邮件就够了。
          </p>
        </div>
      </div>

      <div
        class="mt-10 flex items-center justify-between gap-3 border-t border-line pt-5 text-[13px] text-ink-400 max-md:flex-col max-md:items-start"
      >
        <span>©{{ currentYear }} {{ siteConfig.name }}.cn · {{ siteConfig.slogan }}</span>
        <span class="tabular-nums">v{{ appVersion }}</span>
      </div>
    </div>
  </footer>
</template>
