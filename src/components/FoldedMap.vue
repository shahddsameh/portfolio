<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { prefersReducedMotion } from '@/composables/useMotion'
import { playProjectSound } from '@/composables/useProjectSound'
import { useTheme } from '@/composables/useTheme'
import type { FoldedMapController } from '@/artwork/createFoldedMap'

const host = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const available = ref(false)
const unfolded = ref(false)
const { currentTheme } = useTheme()
const abort = new AbortController()
let controller: FoldedMapController | undefined
let observer: IntersectionObserver | undefined
let resize: ResizeObserver | undefined
let media: MediaQueryList | undefined
let start: { x: number; amount: number } | undefined
let dragged = false
let loading = false

function paintTheme() {
  const paper = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
  controller?.setPaper(paper, currentTheme.value === 'dark')
}
function graphicsLost() {
  available.value = false
  resize?.disconnect()
  controller?.dispose()
  controller = undefined
}
async function initialise() {
  if (loading || controller || !canvas.value || abort.signal.aborted || prefersReducedMotion()) return
  loading = true
  try {
    const { createFoldedMap } = await import('@/artwork/createFoldedMap')
    if (abort.signal.aborted || !canvas.value) return
    controller = await createFoldedMap(canvas.value, abort.signal, getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(), currentTheme.value === 'dark')
    available.value = true
    resize = new ResizeObserver(() => controller?.resize())
    resize.observe(host.value!)
    controller.setFold(unfolded.value ? 0 : 1)
  } catch { /* The real capture remains visible if graphics support or an image is unavailable. */ }
  finally { loading = false }
}
function toggle() {
  if (dragged) { dragged = false; return }
  unfolded.value = !unfolded.value
  controller?.setFold(unfolded.value ? 0 : 1)
  playProjectSound('mwasalaty')
}
function pointerDown(event: PointerEvent) {
  if (!available.value || event.button !== 0) return
  start = { x: event.clientX, amount: unfolded.value ? 0 : 1 }
  dragged = false
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}
function pointerMove(event: PointerEvent) {
  if (!start) return
  const movement = event.clientX - start.x
  if (Math.abs(movement) > 6) { dragged = true; controller?.setFold(start.amount - movement / 200) }
}
function pointerUp(event: PointerEvent) {
  if (!start) return
  if (dragged) { unfolded.value = start.amount - (event.clientX - start.x) / 200 < .5; controller?.setFold(unfolded.value ? 0 : 1); playProjectSound('mwasalaty') }
  start = undefined
}
function cancelPointer() {
  start = undefined
  dragged = false
  controller?.setFold(unfolded.value ? 0 : 1)
}
watch(currentTheme, paintTheme)
onMounted(() => {
  media = matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', motionChanged)
  if (!('IntersectionObserver' in window)) { void initialise(); return }
  observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { void initialise(); observer?.disconnect() } }, { rootMargin: '200px' })
  observer.observe(host.value!)
})
function motionChanged() {
  if (prefersReducedMotion()) { controller?.dispose(); controller = undefined; available.value = false; resize?.disconnect() }
  else void initialise()
}
onBeforeUnmount(() => { abort.abort(); observer?.disconnect(); resize?.disconnect(); media?.removeEventListener('change', motionChanged); controller?.dispose() })
</script>

<template>
  <div ref="host" class="folded-map" :class="{ 'has-renderer': available }">
    <img class="folded-map-fallback" src="/images/projects/mwasalaty/route-results.webp" alt="Mwasalaty route comparison and Cairo map" :aria-hidden="available ? true : undefined" width="1600" height="1125" loading="lazy" />
    <button v-show="available" type="button" class="folded-map-surface" :aria-label="unfolded ? 'Fold the Mwasalaty map' : 'Unfold the Mwasalaty map'" :aria-pressed="unfolded" @click="toggle" @pointerdown="pointerDown" @pointermove="pointerMove" @pointerup="pointerUp" @pointercancel="cancelPointer">
      <canvas ref="canvas" aria-hidden="true" @artwork-unavailable="graphicsLost" />
    </button>
    <button v-if="available" type="button" class="artwork-action" @click="toggle">{{ unfolded ? 'Fold map' : 'Unfold map' }}</button>
  </div>
</template>
