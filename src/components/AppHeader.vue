<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, Moon, Sun, X, Download } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const open = ref(false)
const route = useRoute()
const router = useRouter()
const { currentTheme, toggle } = useTheme()
const isHome = computed(() => route.path === '/')

const goToSection = async (id: string) => {
  open.value = false
  if (!isHome.value) await router.push('/')
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
}
const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && (open.value = false)
document.addEventListener('keydown', closeOnEscape)
onBeforeUnmount(() => document.removeEventListener('keydown', closeOnEscape))
watch(() => route.path, () => (open.value = false))
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="/" aria-label="Shahd Sameh home">SS<span>—26</span></a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <RouterLink to="/">Home</RouterLink>
      <button type="button" @click="goToSection('about')">About</button>
      <RouterLink to="/projects">Projects</RouterLink>
      <button type="button" @click="goToSection('services')">Services</button>
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
        <RouterLink to="/projects">Projects</RouterLink>
        <button type="button" @click="goToSection('services')">Services</button>
        <RouterLink to="/resume">Résumé</RouterLink>
        <button type="button" @click="goToSection('contact')">Contact</button>
        <a class="button" href="/files/Shahd_Sameh_CV.pdf" download><Download :size="17" /> Download CV</a>
      </nav>
    </Transition>
  </header>
</template>
