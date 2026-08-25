<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <AppHeader />
  <main id="main-content">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in"><component :is="Component" /></Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>
