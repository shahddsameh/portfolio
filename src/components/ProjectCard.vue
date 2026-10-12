<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '@/types'
defineProps<{ project: Project; featured?: boolean }>()
</script>

<template>
  <article class="project-card" :class="{ featured }">
    <div class="project-image-wrap" :class="{ placeholder: project.image.includes('placeholder') }">
      <img :src="project.image" :alt="project.imageAlt" width="1600" height="980" loading="lazy" @error="($event.target as HTMLImageElement).classList.add('image-error')" />
    </div>
    <div class="project-card-content">
      <div class="project-index">{{ project.year }} · {{ project.role }}</div>
      <h3><RouterLink class="project-card-link" :to="`/projects/${project.slug}`">{{ project.name }}</RouterLink></h3>
      <p>{{ project.summary }}</p>
      <p v-if="project.contributions.length" class="project-contribution"><span>My contribution</span>{{ project.contributions.slice(0, 3).join(' · ') }}</p>
      <div class="tag-list" aria-label="Technologies">
        <span v-for="tech in project.technologies.slice(0, featured ? 6 : 4)" :key="tech">{{ tech }}</span>
      </div>
      <span class="text-link" aria-hidden="true">View case study <ArrowUpRight :size="17" /></span>
    </div>
  </article>
</template>
