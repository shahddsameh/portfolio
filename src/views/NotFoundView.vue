<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { useSeo } from '@/composables/useSeo'
useSeo({ title: 'Page not found — Shahd Sameh', description: 'The requested page could not be found.', path: '/404' })
</script>

<template>
  <section class="not-found page-shell">
    <p class="eyebrow">Error 404</p><p class="giant-404">404</p><h1>This page took<br /><em>another route.</em></h1>
    <RouterLink class="button button-accent" to="/"><ArrowLeft :size="17" /> Return home</RouterLink>
  </section>
</template>
