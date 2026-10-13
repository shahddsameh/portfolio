<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, Moon, Sun, X, Download } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { prefersReducedMotion } from '@/composables/useMotion'

const open = ref(false)
const route = useRoute()
const router = useRouter()
const { currentTheme, toggle } = useTheme()
const isHome = computed(() => route.path === '/')
// Case-study routes are flat, so the router alone would not mark Projects as current on them.
const inProjects = computed(() => route.path.startsWith('/projects'))

const goToSection = (id: string) => {
  open.value = false
  // From another page, the router's hash handling waits for the home view to finish mounting.
  if (!isHome.value) return router.push({ path: '/', hash: `#${id}` })
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && (open.value = false)
document.addEventListener('keydown', closeOnEscape)
onBeforeUnmount(() => document.removeEventListener('keydown', closeOnEscape))
watch(() => route.path, () => (open.value = false))
</script>

<template>
  <header class="site-header">
    <RouterLink class="wordmark" to="/" aria-label="Shahd Sameh home">SS<span>—26</span></RouterLink>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <RouterLink to="/">Home</RouterLink>
      <button type="button" @click="goToSection('about')">About</button>
      <RouterLink to="/projects" :class="{ 'router-link-active': inProjects }">Projects</RouterLink>
      <RouterLink to="/resume">Résumé</RouterLink>
      <button type="button" @click="goToSection('contact')">Contact</button>
    </nav>
    <div class="header-actions">
      <button class="icon-button" type="button" :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`" @click="toggle">
        <Sun v-if="currentTheme === 'dark'" :size="19" aria-hidden="true" />
        <Moon v-else :size="19" aria-hidden="true" />
      </button>
      <a class="button button-small desktop-download" href="/files/Shahd_Sameh_CV.pdf" download>
        <Download :size="16" aria-hidden="true" /> Download CV
      </a>
      <button class="icon-button menu-button" type="button" :aria-expanded="open" aria-controls="mobile-nav" aria-label="Toggle navigation" @click="open = !open">
        <X v-if="open" :size="22" /><Menu v-else :size="22" />
      </button>
    </div>
    <Transition name="menu">
      <nav v-if="open" id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">
        <RouterLink to="/">Home</RouterLink>
        <button type="button" @click="goToSection('about')">About</button>
        <RouterLink to="/projects" :class="{ 'router-link-active': inProjects }">Projects</RouterLink>
        <RouterLink to="/resume">Résumé</RouterLink>
        <button type="button" @click="goToSection('contact')">Contact</button>
        <a class="button" href="/files/Shahd_Sameh_CV.pdf" download><Download :size="17" /> Download CV</a>
      </nav>
    </Transition>
  </header>
</template>
