<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import JoinSection from '@/components/home/JoinSection.vue'
import MissionSection from '@/components/home/MissionSection.vue'
import ProductsSection from '@/components/home/ProductsSection.vue'
import ResearchSection from '@/components/home/ResearchSection.vue'
import SiteFooter from '@/components/home/SiteFooter.vue'
import SiteHeader from '@/components/home/SiteHeader.vue'
import {useScrollReveal} from '@/composables/useScrollReveal'

useScrollReveal()
</script>

<template>
  <div class="min-h-screen bg-white">
    <SiteHeader/>
    <main>
      <HeroSection/>
      <MissionSection/>
      <ProductsSection/>
      <ResearchSection/>
      <JoinSection/>
    </main>
    <SiteFooter/>
  </div>
</template>
