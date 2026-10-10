<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from 'vue'
import {CloseIcon, MailIcon, MenuIcon} from 'tdesign-icons-vue-next'
import BrandLogo from '@/components/BrandLogo.vue'
import {navItems, siteConfig} from '@/config/content'
import {useActiveSection} from '@/composables/useActiveSection'
import {scrollToAnchor} from '@/composables/useSectionScroll'

const anchorIds = computed(() => navItems.map((item) => item.anchor))
const activeSection = useActiveSection(anchorIds.value)

const menuOpen = ref(false)
const scrolled = ref(false)

const handleGo = (anchor: string) => {
  menuOpen.value = false
  scrollToAnchor(anchor)
}

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, {passive: true})
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-900 h-16 border-b transition-colors duration-250"
    :class="[
      scrolled || menuOpen
        ? 'border-line bg-white shadow-[0_4px_16px_rgba(11,27,43,0.05)]'
        : 'border-transparent bg-white/86 backdrop-blur-md',
    ]"
  >
    <div class="aim-container flex h-full items-center gap-6 max-md:gap-3">
      <a class="flex shrink-0 items-center gap-2.5" href="#" @click.prevent="handleGo('home')">
        <BrandLogo :size="30"/>
        <span class="text-lg font-bold tracking-tight text-ink-900 max-md:text-[17px]">
          {{ siteConfig.name }}
          <span class="text-brand">.cn</span>
        </span>
      </a>

      <nav class="ml-auto hidden items-center gap-1 lg:flex" aria-label="主导航">
        <a
          v-for="item in navItems"
          :key="item.key"
          class="relative rounded-lg px-3.5 py-2 text-[15px] transition-colors duration-200"
          :class="activeSection === item.anchor ? 'font-semibold text-brand-700' : 'text-ink-500 hover:bg-brand-soft-2 hover:text-brand'"
          :href="`#${item.anchor}`"
          :aria-current="activeSection === item.anchor ? 'true' : undefined"
          @click.prevent="handleGo(item.anchor)"
        >
          {{ item.label }}
          <span
            v-if="activeSection === item.anchor"
            class="absolute inset-x-3.5 bottom-0.5 h-0.5 rounded-full bg-brand"
          ></span>
        </a>
      </nav>

      <div class="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
        <t-button theme="primary" shape="round" :href="`mailto:${siteConfig.email}`">
          <template #icon>
            <MailIcon size="16"/>
          </template>
          <span class="max-md:hidden">联系我们</span>
        </t-button>

        <button
          class="inline-flex size-9.5 cursor-pointer items-center justify-center rounded-[10px] border border-line bg-white text-ink-700 transition-colors hover:border-brand hover:text-brand lg:hidden"
          type="button"
          :aria-expanded="menuOpen"
          aria-label="展开导航"
          @click="menuOpen = !menuOpen"
        >
          <component :is="menuOpen ? CloseIcon : MenuIcon" size="20"/>
        </button>
      </div>
    </div>

    <nav
      v-if="menuOpen"
      class="flex flex-col gap-1.5 border-t border-line-soft bg-white px-5 pt-3 pb-5 shadow-[0_18px_30px_rgba(11,27,43,0.08)] lg:hidden"
      aria-label="移动端导航"
    >
      <a
        v-for="item in navItems"
        :key="item.key"
        class="rounded-[10px] px-3.5 py-3 text-base"
        :class="activeSection === item.anchor ? 'bg-brand-soft-2 font-semibold text-brand-700' : 'text-ink-700'"
        href="#"
        @click.prevent="handleGo(item.anchor)"
      >
        {{ item.label }}
      </a>
      <t-button block theme="primary" :href="`mailto:${siteConfig.email}`">
        <template #icon>
          <MailIcon size="16"/>
        </template>
        {{ siteConfig.email }}
      </t-button>
    </nav>
  </header>
</template>
