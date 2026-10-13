<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '@/types'
// Cards sit under a section h2 on home but directly under the page h1 on /projects.
withDefaults(defineProps<{ project: Project; featured?: boolean; headingLevel?: 2 | 3 }>(), { headingLevel: 3 })
</script>

<template>
  <article class="project-card" :class="{ featured }">
    <div class="project-image-wrap" :class="{ placeholder: project.image.includes('placeholder') }">
      <img :src="project.image" :alt="project.imageAlt" width="1600" height="980" loading="lazy" />
    </div>
    <div class="project-card-content">
      <div class="project-index">{{ project.year }} · {{ project.role }}</div>
      <component :is="`h${headingLevel}`" class="project-card-title"><RouterLink class="project-card-link" :to="`/projects/${project.slug}`">{{ project.name }}</RouterLink></component>
      <p>{{ project.summary }}</p>
      <p v-if="project.contributions.length" class="project-contribution"><span>My contribution</span><mark class="ink-mark">{{ project.contributions.slice(0, 3).join(' · ') }}</mark></p>
      <div class="tag-list" aria-label="Technologies">
        <span v-for="tech in project.technologies.slice(0, featured ? 6 : 4)" :key="tech">{{ tech }}</span>
      </div>
      <span class="text-link" aria-hidden="true">View case study <ArrowUpRight :size="17" /></span>
    </div>
  </article>
</template>
