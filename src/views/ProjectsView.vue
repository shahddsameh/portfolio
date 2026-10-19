<script setup lang="ts">
import ProjectShowcase from '@/components/ProjectShowcase.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Projects — Shahd Sameh',
  description: 'Case studies spanning transit technology, and online therapy, with clear contribution boundaries.',
  path: '/projects',
})
</script>

<template>
  <ProjectShowcase standalone />
</template>
