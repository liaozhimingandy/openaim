<script setup lang="ts">
import {ArrowRightIcon, CheckCircleIcon} from 'tdesign-icons-vue-next'
import {products} from '@/config/content'
</script>

<template>
  <section id="products" class="aim-section">
    <div class="aim-container">
      <div class="aim-section-head">
        <span class="aim-eyebrow" data-reveal>我们的产品</span>
        <h2 class="aim-title" data-reveal>研究的成果，我们也想做成能用的东西</h2>
        <p class="aim-lead" data-reveal>
          下面这些都在很早期的阶段，能跑起来的先上线，跑不动的就先写着。
          每一款都欢迎你参与共建。
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <t-card
          v-for="product in products"
          :key="product.name"
          class="flex h-full flex-col"
          size="small"
          hover-shadow
          :body-style="{flex: 1}"
          data-reveal
        >
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <span class="aim-icon-box">
                <component :is="product.icon" size="20"/>
              </span>
              <t-tag :theme="product.statusTheme" variant="light" size="small" shape="round">
                {{ product.status }}
              </t-tag>
            </div>
          </template>

          <h3 class="text-lg font-semibold text-ink-900">{{ product.name }}</h3>
          <p class="mt-0.5 text-[13.5px] font-semibold text-brand-700">{{ product.tagline }}</p>
          <p class="mt-2.5 aim-desc-sm">{{ product.desc }}</p>

          <t-divider dashed/>

          <ul class="grid gap-1.5">
            <li
              v-for="item in product.highlights"
              :key="item"
              class="flex items-center gap-1.75 text-[13px] text-ink-700"
            >
              <CheckCircleIcon class="shrink-0 text-brand" size="14"/>
              <span>{{ item }}</span>
            </li>
          </ul>

          <template #footer>
            <t-button
              v-if="product.href"
              variant="text"
              theme="primary"
              size="small"
              :href="product.href"
              target="_blank"
              rel="noopener"
            >
              前往体验
              <template #suffix>
                <ArrowRightIcon size="14"/>
              </template>
            </t-button>
            <span v-else class="text-[13px] text-ink-300">尚未开放访问</span>
          </template>
        </t-card>
      </div>
    </div>
  </section>
</template>
