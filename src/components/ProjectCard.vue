<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '@/types'
defineProps<{ project: Project; featured?: boolean }>()
</script>

<template>
  <article class="project-card" :class="{ featured }">
    <RouterLink class="project-image-wrap" :class="{ placeholder: project.image.includes('placeholder') }" :to="`/projects/${project.slug}`">
      <img :src="project.image" :alt="project.imageAlt" width="1600" height="980" loading="lazy" @error="($event.target as HTMLImageElement).classList.add('image-error')" />
    </RouterLink>
    <div class="project-card-content">
      <div class="project-index">{{ project.year }} · {{ project.role }}</div>
      <h3><RouterLink :to="`/projects/${project.slug}`">{{ project.name }}</RouterLink></h3>
      <p>{{ project.summary }}</p>
      <div class="tag-list" aria-label="Technologies">
        <span v-for="tech in project.technologies.slice(0, featured ? 6 : 4)" :key="tech">{{ tech }}</span>
      </div>
      <RouterLink class="text-link" :to="`/projects/${project.slug}`">View case study <ArrowUpRight :size="17" /></RouterLink>
    </div>
  </article>
</template>
