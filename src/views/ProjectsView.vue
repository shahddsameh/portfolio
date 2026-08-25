<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Projects — Shahd Sameh',
  description: 'Case studies spanning transit technology, online therapy, and a freelancing marketplace, with clear contribution boundaries.',
  path: '/projects',
})
</script>

<template>
  <div class="page-shell page-intro">
    <p class="eyebrow">Selected work · 2022—2026</p>
    <h1>Projects with<br /><em>real constraints.</em></h1>
    <p class="lead">A focused selection of products where I contributed through leadership, product logic, interface development, or full-stack implementation. Each case study states exactly what I owned.</p>
    <div class="projects-list">
      <ProjectCard v-for="(project, index) in projects" :key="project.slug" :project="project" :featured="index === 0" />
    </div>
  </div>
</template>
