<script setup lang="ts">
import { computed, ref } from 'vue'
import { Layers3 } from 'lucide-vue-next'
import { playProjectSound } from '@/composables/useProjectSound'
import type { Project } from '@/types'

const props = defineProps<{ project: Project }>()
const expanded = ref(false)
const image = computed(() => props.project.slug === 'pwc-middle-east' ? '/images/projects/pwc/home-hero.webp' : props.project.slug === 'inneraura' ? '/images/projects/inneraura/landing-page.webp' : '/images/projects/mwasalaty/route-results.webp')
const imageAlt = computed(() => props.project.slug === 'pwc-middle-east' ? 'The redesigned PwC Middle East mobile Home page' : props.project.slug === 'mwasalaty' ? 'Mwasalaty route results with a comparison card and Cairo map' : props.project.imageAlt)
function toggle() { expanded.value = !expanded.value; playProjectSound(props.project.slug) }
</script>

<template>
  <section class="case-explore page-shell" :aria-labelledby="`${project.slug}-explore-title`">
    <div class="case-explore-heading"><h2 :id="`${project.slug}-explore-title`">A closer look.</h2><button type="button" class="text-link" :aria-pressed="expanded" @click="toggle"><Layers3 :size="16" aria-hidden="true" />{{ expanded ? 'Flatten layers' : 'Inspect layers' }}</button></div>
    <div class="project-layers" :class="[`project-layers--${project.slug}`, { 'is-expanded': expanded }]">
      <div class="project-layer-base"><img :src="image" :alt="imageAlt" width="1600" height="1125" loading="lazy" /></div>
      <template v-if="project.slug === 'mwasalaty'"><div class="project-layer-detail transit-route-detail" role="img" aria-label="Close-up of the route comparison card" /><div class="project-layer-detail transit-map-detail" role="img" aria-label="Close-up of the Cairo map" /></template>
      <div v-else-if="project.slug === 'pwc-middle-east'" class="project-layer-detail pwc-insight-detail" role="img" aria-label="Close-up of the redesigned featured insights" />
      <div v-else class="project-layer-detail therapy-illustration-detail" role="img" aria-label="Close-up of the InnerAura landing page illustration" />
    </div>
  </section>
</template>
