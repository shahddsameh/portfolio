<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { prefersReducedMotion } from '@/composables/useMotion'
import { playProjectSound } from '@/composables/useProjectSound'
import { useTheme } from '@/composables/useTheme'
import FoldedMapPoster from '@/components/FoldedMapPoster.vue'
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
    const created = await createFoldedMap(canvas.value, abort.signal, getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(), currentTheme.value === 'dark')
    if (abort.signal.aborted || prefersReducedMotion()) { created.dispose(); return }
    controller = created
    paintTheme()
    resize = new ResizeObserver(() => controller?.resize())
    resize.observe(host.value!)
    controller.setFold(unfolded.value ? 0 : 1)
    // The canvas has measurable dimensions while hidden; reveal only after its first paint.
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
    if (!abort.signal.aborted && controller === created) available.value = true
  } catch { /* The already-folded poster remains visible when graphics are unavailable. */ }
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
    <FoldedMapPoster :aria-hidden="available ? true : undefined" />
    <button type="button" class="folded-map-surface" :disabled="!available" :aria-hidden="!available ? true : undefined" :aria-label="unfolded ? 'Fold the Mwasalaty map' : 'Unfold the Mwasalaty map'" :aria-pressed="unfolded" @click="toggle" @pointerdown="pointerDown" @pointermove="pointerMove" @pointerup="pointerUp" @pointercancel="cancelPointer">
      <canvas ref="canvas" aria-hidden="true" @artwork-unavailable="graphicsLost" />
    </button>
    <button v-if="available" type="button" class="artwork-action" @click="toggle">{{ unfolded ? 'Fold map' : 'Unfold map' }}</button>
  </div>
</template>
