<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import FoldedMap from '@/components/FoldedMap.vue'
import PwCMobilePreview from '@/components/PwCMobilePreview.vue'
import CalendarArtwork from '@/components/CalendarArtwork.vue'
import { projects } from '@/data/projects'
import { playProjectSound } from '@/composables/useProjectSound'
import { selectedProjectSlug } from '@/composables/useSelectedProject'
import { prefersReducedMotion } from '@/composables/useMotion'

withDefaults(defineProps<{ standalone?: boolean }>(), { standalone: false })
const ordered = ['mwasalaty', 'pwc-middle-east', 'inneraura'].flatMap(slug => projects.filter(project => project.slug === slug))
const selected = computed(() => Math.max(0, ordered.findIndex(project => project.slug === selectedProjectSlug.value)))
const project = computed(() => ordered[selected.value])
const name = computed(() => project.value.name.split(' — ')[0])
const years = computed(() => [...new Set(ordered.map(project => project.year))].sort().join('—'))
const mobileMedia = matchMedia('(max-width: 600px), (max-width: 900px) and (pointer: coarse)')
const mobile = ref(mobileMedia.matches)
const reel = ref<HTMLElement>()
const artwork = { mwasalaty: FoldedMap, 'pwc-middle-east': PwCMobilePreview, inneraura: CalendarArtwork }
const swipeSlides = [ordered[ordered.length - 1], ...ordered, ordered[0]]
const activeSlot = ref(selected.value + 1)
let resize: ResizeObserver | undefined
let scrollFrame = 0
let settleTimer: ReturnType<typeof setTimeout> | undefined
const touching = ref(false)
function slideWidth() { return reel.value?.querySelector<HTMLElement>('.showcase-slide')?.getBoundingClientRect().width ?? 0 }
function updateSelection(index: number) {
  if (index < 0 || index >= ordered.length || selected.value === index) return
  selectedProjectSlug.value = ordered[index].slug
  playProjectSound(project.value.slug)
}
function select(index: number) {
  if (mobile.value && reel.value) reel.value.scrollTo({ left: (index + 1) * slideWidth(), behavior: prefersReducedMotion() ? 'instant' : 'smooth' })
  else if (index >= 0 && index < ordered.length) updateSelection(index)
}
function settled() {
  if (!reel.value || touching.value || !slideWidth()) return
  const slot = Math.round(reel.value.scrollLeft / slideWidth())
  if (slot === 0 || slot === swipeSlides.length - 1) {
    const nextSlot = slot === 0 ? ordered.length : 1
    activeSlot.value = nextSlot
    reel.value.scrollTo({ left: nextSlot * slideWidth(), behavior: 'instant' })
  }
}
function scrolled() {
  clearTimeout(settleTimer)
  settleTimer = setTimeout(settled, 180)
  if (scrollFrame) return
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0
    if (reel.value && slideWidth()) {
      const slot = Math.max(0, Math.min(swipeSlides.length - 1, Math.round(reel.value.scrollLeft / slideWidth())))
      activeSlot.value = slot
      updateSelection((slot - 1 + ordered.length) % ordered.length)
    }
  })
}
function mediaChanged() { mobile.value = mobileMedia.matches }
watch(reel, element => {
  resize?.disconnect()
  if (!element) return
  let width = 0
  resize = new ResizeObserver(() => {
    if (element.clientWidth === width) return
    width = element.clientWidth
    activeSlot.value = selected.value + 1
    element.scrollTo({ left: activeSlot.value * slideWidth(), behavior: 'instant' })
  })
  resize.observe(element)
}, { flush: 'post' })
onMounted(() => mobileMedia.addEventListener('change', mediaChanged))
onBeforeUnmount(() => { mobileMedia.removeEventListener('change', mediaChanged); resize?.disconnect(); cancelAnimationFrame(scrollFrame); clearTimeout(settleTimer) })
</script>

<template>
  <section id="selected-work" class="selected-showcase page-shell" :class="{ 'selected-showcase--standalone': standalone, 'selected-showcase--swipe': mobile }" aria-labelledby="selected-work-title">
    <div class="showcase-heading"><component :is="standalone ? 'h1' : 'h2'" id="selected-work-title">Selected <em>work.</em></component><p><span class="showcase-note">Selected projects<br></span>{{ years }}</p></div>
    <nav v-if="mobile" class="showcase-reel-navigation" aria-label="Browse selected projects">
      <button type="button" aria-label="Previous project" @click="select(selected - 1)"><ArrowLeft :size="17" aria-hidden="true" /> Previous</button>
      <p><span aria-live="polite" aria-atomic="true">{{ selected + 1 }} / {{ ordered.length }}</span><span>Swipe to explore</span></p>
      <button type="button" aria-label="Next project" @click="select(selected + 1)">Next <ArrowRight :size="17" aria-hidden="true" /></button>
    </nav>
    <div v-if="mobile" ref="reel" class="showcase-reel showcase-artwork" :class="`showcase-artwork--${project.slug}`" role="region" aria-roledescription="carousel" aria-label="Selected project artwork" tabindex="0" @scroll.passive="scrolled" @scrollend="settled" @touchstart.passive="touching = true" @touchend.passive="touching = false" @touchcancel="touching = false" @keydown.left.self.prevent="select(selected - 1)" @keydown.right.self.prevent="select(selected + 1)">
      <div v-for="(item, index) in swipeSlides" :key="`${item.slug}-${index}`" class="showcase-artwork showcase-slide" :class="[`showcase-artwork--${item.slug}`, { 'is-current': index === activeSlot, 'is-before': index < activeSlot, 'is-after': index > activeSlot }]" role="group" aria-roledescription="slide" :aria-label="`${(index - 1 + ordered.length) % ordered.length + 1} of ${ordered.length}: ${item.name.split(' — ')[0]}`" :aria-hidden="index !== activeSlot ? true : undefined" :inert="index !== activeSlot">
        <div class="showcase-slide-art"><component :is="artwork[item.slug as keyof typeof artwork]" /></div>
      </div>
    </div>
    <div v-else class="showcase-artwork" :class="`showcase-artwork--${project.slug}`">
      <FoldedMap v-if="project.slug === 'mwasalaty'" />
      <PwCMobilePreview v-else-if="project.slug === 'pwc-middle-east'" />
      <CalendarArtwork v-else />
    </div>
    <div class="showcase-caption" aria-live="polite" aria-atomic="true">
      <div class="showcase-identity"><span class="showcase-count">{{ String(selected + 1).padStart(2, '0') }} / {{ String(ordered.length).padStart(2, '0') }}</span><component :is="standalone ? 'h2' : 'h3'">{{ name }}</component><p>{{ project.role }}</p></div>
      <p class="showcase-summary">{{ project.summary }}</p>
      <RouterLink class="showcase-open" :to="`/projects/${project.slug}`">View case study <ArrowRight :size="18" aria-hidden="true" /></RouterLink>
    </div>
    <nav class="showcase-index" aria-label="Select a project"><button v-for="(item, index) in ordered" :key="item.slug" type="button" :aria-pressed="selected === index" @click="select(index)"><span>{{ String(index + 1).padStart(2, '0') }}</span><strong>{{ item.name.split(' — ')[0] }}</strong></button></nav>
    <noscript><p>Browse the <a href="/projects/mwasalaty">Mwasalaty</a>, <a href="/projects/pwc-middle-east">PwC</a> and <a href="/projects/inneraura">InnerAura</a> case studies.</p></noscript>
  </section>
</template>
