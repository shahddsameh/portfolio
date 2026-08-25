<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { profile } from '@/data/profile'
</script>

<template>
  <footer class="site-footer">
    <div>
      <p class="eyebrow">Shahd Sameh Ahmed</p>
      <h2>Product thinking,<br /><em>made tangible.</em></h2>
    </div>
    <div class="footer-links">
      <a :href="`mailto:${profile.email}`">{{ profile.email }} <ArrowUpRight :size="15" /></a>
      <a v-for="link in profile.links" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">{{ link.label }} <ArrowUpRight :size="15" /></a>
      <a href="#app">Back to top ↑</a>
    </div>
    <p class="footer-meta">© {{ new Date().getFullYear() }} Shahd Sameh. Designed and built with intention.</p>
  </footer>
</template>
