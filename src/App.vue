<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ProjectOpening from '@/components/ProjectOpening.vue'
import { projectOpening } from '@/composables/useProjectOpening'
</script>

<template>
  <div :inert="projectOpening ? true : undefined">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <AppHeader />
    <main id="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in"><component :is="Component" :key="route.path" /></Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
  <ProjectOpening />
</template>
