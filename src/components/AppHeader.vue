<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-vue-next'
import DownloadCvLink from '@/components/DownloadCvLink.vue'
import { useTheme } from '@/composables/useTheme'
import { prefersReducedMotion } from '@/composables/useMotion'
import { projectSoundEnabled, toggleProjectSound } from '@/composables/useProjectSound'

const open = ref(false)
const route = useRoute()
const router = useRouter()
const { currentTheme, toggle } = useTheme()
const isHome = computed(() => route.path === '/')
// Case-study routes are flat, so the router alone would not mark Projects as current on them.
const inProjects = computed(() => route.path.startsWith('/projects'))
type HomeSection = 'about' | 'contact'
type HomeDestination = HomeSection | 'home'
const activeHomeSection = ref<HomeSection | null>(null)
let pendingDestination: HomeDestination | null = null
let pendingTimer: ReturnType<typeof setTimeout> | undefined
let scrollFrame = 0

const clearPending = () => {
  pendingDestination = null
  if (pendingTimer) clearTimeout(pendingTimer)
}

const syncActiveSection = () => {
  scrollFrame = 0
  if (!isHome.value) return
  const marker = Math.min(window.innerHeight * .55, 520)
  const containsMarker = (id: HomeSection) => {
    const rect = document.getElementById(id)?.getBoundingClientRect()
    return !!rect && rect.top <= marker && rect.bottom > marker
  }
  if (pendingDestination) {
    const arrived = pendingDestination === 'home' ? window.scrollY < 40 : containsMarker(pendingDestination)
    if (!arrived) return
    clearPending()
  }
  activeHomeSection.value = containsMarker('contact') ? 'contact' : containsMarker('about') ? 'about' : null
}

const scheduleSync = () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncActiveSection)
}

const beginNavigation = (destination: HomeDestination) => {
  clearPending()
  pendingDestination = destination
  activeHomeSection.value = destination === 'home' ? null : destination
  pendingTimer = setTimeout(() => { pendingDestination = null; scheduleSync() }, 1800)
}

const goToSection = (id: HomeSection) => {
  open.value = false
  beginNavigation(id)
  // From another page, the router's hash handling waits for the home view to finish mounting.
  if (!isHome.value) return router.push({ path: '/', hash: `#${id}` })
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
const goHome = (event: MouseEvent) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  open.value = false
  beginNavigation('home')
  if (isHome.value) window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && (open.value = false)
document.addEventListener('keydown', closeOnEscape)
onMounted(() => {
  window.addEventListener('scroll', scheduleSync, { passive: true })
  window.addEventListener('resize', scheduleSync)
  if (isHome.value && (route.hash === '#about' || route.hash === '#contact')) beginNavigation(route.hash.slice(1) as HomeSection)
  scheduleSync()
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', closeOnEscape)
  window.removeEventListener('scroll', scheduleSync)
  window.removeEventListener('resize', scheduleSync)
  cancelAnimationFrame(scrollFrame)
  clearPending()
})
watch(() => route.fullPath, () => {
  open.value = false
  if (!isHome.value) { clearPending(); activeHomeSection.value = null }
  else if (route.hash === '#about' || route.hash === '#contact') beginNavigation(route.hash.slice(1) as HomeSection)
  else scheduleSync()
})
</script>

<template>
  <header class="site-header">
    <RouterLink class="wordmark" to="/" aria-label="Shahd Sameh home" @click="goHome">SS<span>—26</span></RouterLink>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <RouterLink to="/" active-class="home-route-active" exact-active-class="home-route-exact" :aria-current-value="activeHomeSection ? 'false' : 'page'" :class="{ 'nav-current': isHome && !activeHomeSection }" @click="goHome">Home</RouterLink>
      <button type="button" :class="{ 'nav-current': isHome && activeHomeSection === 'about' }" :aria-current="isHome && activeHomeSection === 'about' ? 'location' : undefined" @click="goToSection('about')">About</button>
      <RouterLink to="/projects" :class="{ 'router-link-active': inProjects }">Projects</RouterLink>
      <RouterLink to="/resume">Résumé</RouterLink>
      <button type="button" :class="{ 'nav-current': isHome && activeHomeSection === 'contact' }" :aria-current="isHome && activeHomeSection === 'contact' ? 'location' : undefined" @click="goToSection('contact')">Contact</button>
    </nav>
    <div class="header-actions">
      <button class="icon-button" type="button" :aria-label="projectSoundEnabled ? 'Mute project sounds' : 'Enable project sounds'" :aria-pressed="projectSoundEnabled" @click="toggleProjectSound">
        <Volume2 v-if="projectSoundEnabled" :size="18" aria-hidden="true" /><VolumeX v-else :size="18" aria-hidden="true" />
      </button>
      <button class="icon-button" type="button" :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`" @click="toggle">
        <Sun v-if="currentTheme === 'dark'" :size="19" aria-hidden="true" />
        <Moon v-else :size="19" aria-hidden="true" />
      </button>
      <DownloadCvLink class="desktop-download" small />
      <button class="icon-button menu-button" type="button" :aria-expanded="open" aria-controls="mobile-nav" aria-label="Toggle navigation" @click="open = !open">
        <X v-if="open" :size="22" /><Menu v-else :size="22" />
      </button>
    </div>
    <Transition name="menu">
      <nav v-if="open" id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">
        <RouterLink to="/" active-class="home-route-active" exact-active-class="home-route-exact" :aria-current-value="activeHomeSection ? 'false' : 'page'" :class="{ 'nav-current': isHome && !activeHomeSection }" @click="goHome">Home</RouterLink>
        <button type="button" :class="{ 'nav-current': isHome && activeHomeSection === 'about' }" :aria-current="isHome && activeHomeSection === 'about' ? 'location' : undefined" @click="goToSection('about')">About</button>
        <RouterLink to="/projects" :class="{ 'router-link-active': inProjects }">Projects</RouterLink>
        <RouterLink to="/resume">Résumé</RouterLink>
        <button type="button" :class="{ 'nav-current': isHome && activeHomeSection === 'contact' }" :aria-current="isHome && activeHomeSection === 'contact' ? 'location' : undefined" @click="goToSection('contact')">Contact</button>
        <DownloadCvLink />
      </nav>
    </Transition>
  </header>
</template>
