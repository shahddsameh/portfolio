<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId } from 'vue'
import { ArrowLeft, ArrowRight, ExternalLink, RotateCw, X, ZoomIn, ZoomOut } from 'lucide-vue-next'
import type { InspectionCapture } from '@/artwork/projectInspection'

const props = defineProps<{ captures: InspectionCapture[] }>()
const id = `capture-${useId()}`
const dialog = ref<HTMLDialogElement>()
const scrollRegion = ref<HTMLElement>()
const selected = ref<InspectionCapture>()
const zoomed = ref(false)
const loading = ref(false)
const failed = ref(false)
const attempt = ref(0)
let opener: HTMLElement | null = null
let previousOverflow: string | undefined
const source = computed(() => selected.value ? `${selected.value.src}${attempt.value ? `?retry=${attempt.value}` : ''}` : '')
const captureWidth = computed(() => selected.value?.crop?.[2] ?? selected.value?.width ?? 0)
const selectedIndex = computed(() => props.captures.findIndex(capture => capture.id === selected.value?.id))
let touchStart: { x: number; y: number } | undefined

function move(direction: number) {
  const capture = props.captures[selectedIndex.value + direction]
  if (capture) void select(capture)
}
function navigateKey(event: KeyboardEvent) {
  if (zoomed.value || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    move(event.key === 'ArrowLeft' ? -1 : 1)
  }
}
function startSwipe(event: TouchEvent) {
  touchStart = !zoomed.value && event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : undefined
}
function endSwipe(event: TouchEvent) {
  if (!touchStart || zoomed.value || !event.changedTouches.length) { touchStart = undefined; return }
  const dx = event.changedTouches[0].clientX - touchStart.x
  const dy = event.changedTouches[0].clientY - touchStart.y
  touchStart = undefined
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1)
}

async function select(capture: InspectionCapture) {
  if (selected.value?.id === capture.id && !failed.value) return
  selected.value = capture
  zoomed.value = false
  loading.value = true
  failed.value = false
  attempt.value = 0
  await nextTick()
  scrollRegion.value?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}
async function open(capture: InspectionCapture) {
  if (!dialog.value?.open) opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
  await select(capture)
  if (!dialog.value?.isConnected || dialog.value.open) return
  previousOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
  dialog.value.showModal()
}
function restoreScroll() {
  if (previousOverflow === undefined) return
  document.documentElement.style.overflow = previousOverflow
  previousOverflow = undefined
}
function closed() {
  restoreScroll()
  selected.value = undefined
  if (opener?.isConnected) opener.focus({ preventScroll: true })
  opener = null
}
function imageFailed() { loading.value = false; failed.value = true }
function retry() { failed.value = false; loading.value = true; attempt.value++ }
function toggleZoom() {
  zoomed.value = !zoomed.value
  scrollRegion.value?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}
onBeforeUnmount(() => { opener = null; dialog.value?.close(); restoreScroll() })
defineExpose({ open })
</script>

<template>
  <dialog ref="dialog" class="capture-viewer" :aria-labelledby="`${id}-title`" :aria-describedby="`${id}-description`" @close="closed" @keydown="navigateKey">
    <template v-if="selected">
      <header class="capture-viewer-header">
        <div class="capture-viewer-title">
          <h2 :id="`${id}-title`">{{ selected.title }}</h2>
          <button type="button" class="icon-button" aria-label="Close image viewer" autofocus @click="dialog?.close()"><X :size="22" aria-hidden="true" /></button>
        </div>
        <p :id="`${id}-description`">{{ selected.description }}</p>
        <div class="capture-viewer-tools">
          <nav v-if="captures.length > 1" class="capture-viewer-pagination" aria-label="Browse figures">
            <button type="button" aria-label="Previous figure" :disabled="selectedIndex <= 0" @click="move(-1)"><ArrowLeft :size="16" aria-hidden="true" /> Previous</button>
            <span aria-live="polite" aria-atomic="true">{{ selectedIndex + 1 }} / {{ captures.length }}</span>
            <button type="button" aria-label="Next figure" :disabled="selectedIndex >= captures.length - 1" @click="move(1)">Next <ArrowRight :size="16" aria-hidden="true" /></button>
          </nav>
          <div class="capture-viewer-actions">
            <button type="button" :aria-pressed="zoomed" :disabled="failed || loading" @click="toggleZoom"><component :is="zoomed ? ZoomOut : ZoomIn" :size="17" aria-hidden="true" />{{ zoomed ? 'Fit to width' : 'Zoom in' }}</button>
            <a :href="selected.src" target="_blank" rel="noreferrer">Open original <ExternalLink :size="15" aria-hidden="true" /></a>
          </div>
        </div>
      </header>
      <div ref="scrollRegion" class="capture-viewer-scroll" :class="{ 'is-zoomed': zoomed }" role="region" aria-label="Image preview; scroll to explore" tabindex="0" :aria-busy="loading" @touchstart.passive="startSwipe" @touchend.passive="endSwipe" @touchcancel="touchStart = undefined">
        <p v-if="loading" class="capture-viewer-status" role="status">Loading capture…</p>
        <div v-if="failed" class="capture-viewer-error" role="alert">
          <p>The capture could not load. Check your connection and try again.</p>
          <button type="button" class="text-link" @click="retry"><RotateCw :size="16" aria-hidden="true" /> Try again</button>
        </div>
        <div v-else class="capture-viewer-art" :style="{ '--capture-width': `${captureWidth}px` }">
          <svg v-if="selected.crop" :key="`${selected.id}-${attempt}`" :viewBox="selected.crop.join(' ')" :width="selected.crop[2]" :height="selected.crop[3]" role="img" :aria-label="selected.alt">
            <image :href="source" :width="selected.width" :height="selected.height" @load="loading = false" @error="imageFailed" />
          </svg>
          <img v-else :key="`${selected.id}-${attempt}`" :src="source" :alt="selected.alt" :width="selected.width" :height="selected.height" @load="loading = false" @error="imageFailed" />
        </div>
      </div>
    </template>
  </dialog>
</template>

