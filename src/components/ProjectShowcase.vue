<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import FoldedMap from '@/components/FoldedMap.vue'
import PwCMobilePreview from '@/components/PwCMobilePreview.vue'
import CalendarArtwork from '@/components/CalendarArtwork.vue'
import { projects } from '@/data/projects'
import { playProjectSound } from '@/composables/useProjectSound'
import { selectedProjectSlug } from '@/composables/useSelectedProject'

withDefaults(defineProps<{ standalone?: boolean }>(), { standalone: false })
const ordered = ['mwasalaty', 'pwc-middle-east', 'inneraura'].flatMap(slug => projects.filter(project => project.slug === slug))
const selected = computed(() => Math.max(0, ordered.findIndex(project => project.slug === selectedProjectSlug.value)))
const project = computed(() => ordered[selected.value])
const name = computed(() => project.value.name.split(' — ')[0])
const years = computed(() => [...new Set(ordered.map(project => project.year))].sort().join('—'))
function select(index: number) { if (selected.value !== index) { selectedProjectSlug.value = ordered[index].slug; playProjectSound(project.value.slug) } }
</script>

<template>
  <section id="selected-work" class="selected-showcase page-shell" :class="{ 'selected-showcase--standalone': standalone }" aria-labelledby="selected-work-title">
    <div class="showcase-heading"><component :is="standalone ? 'h1' : 'h2'" id="selected-work-title">Selected <em>work.</em></component><p><span class="showcase-note">Selected projects<br></span>{{ years }}</p></div>
    <div class="showcase-artwork" :class="`showcase-artwork--${project.slug}`">
      <FoldedMap v-if="project.slug === 'mwasalaty'" />
      <PwCMobilePreview v-else-if="project.slug === 'pwc-middle-east'" />
      <CalendarArtwork v-else />
    </div>
    <div class="showcase-caption" aria-live="polite" aria-atomic="true">
      <div class="showcase-identity"><span class="showcase-count">{{ String(selected + 1).padStart(2, '0') }} / {{ String(ordered.length).padStart(2, '0') }}</span><component :is="standalone ? 'h2' : 'h3'">{{ name }}</component><p>{{ project.role }}</p></div>
      <p class="showcase-summary">{{ project.summary }}</p>
      <RouterLink class="showcase-open" :to="`/projects/${project.slug}`">View case study <ArrowRight :size="18" aria-hidden="true" /></RouterLink>
    </div>
    <nav class="showcase-index" aria-label="Select a project"><button v-for="(item, index) in ordered" :key="item.slug" type="button" :aria-pressed="selected === index" @click="select(index)"><span>{{ String(index + 1).padStart(2, '0') }}</span><strong>{{ item.name.split(' — ')[0] }}</strong></button></nav>
    <noscript><p>Browse the <a href="/projects/mwasalaty">Mwasalaty</a>, <a href="/projects/pwc-middle-east">PwC</a> and <a href="/projects/inneraura">InnerAura</a> case studies.</p></noscript>
  </section>
</template>
