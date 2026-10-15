<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { projectViewTransitionSlug } from '@/composables/useProjectViewTransition'
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <AppHeader />
  <main id="main-content">
    <RouterView v-slot="{ Component }">
      <!-- Keep out-in mounted; the browser animates project navigation while Vue swaps views without page CSS. -->
      <Transition :name="projectViewTransitionSlug ? 'project-page' : 'page'" mode="out-in"><component :is="Component" /></Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>
