<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId } from 'vue'
import { ExternalLink, RotateCw, X, ZoomIn, ZoomOut } from 'lucide-vue-next'
import type { InspectionCapture } from '@/artwork/projectInspection'

defineProps<{ captures: InspectionCapture[] }>()
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
  <dialog ref="dialog" class="capture-viewer" :aria-labelledby="`${id}-title`" :aria-describedby="`${id}-description`" @close="closed">
    <template v-if="selected">
      <header class="capture-viewer-header">
        <div class="capture-viewer-title">
          <h2 :id="`${id}-title`">{{ selected.title }}</h2>
          <button type="button" class="icon-button" aria-label="Close image viewer" autofocus @click="dialog?.close()"><X :size="22" aria-hidden="true" /></button>
        </div>
        <p :id="`${id}-description`">{{ selected.description }}</p>
        <div class="capture-viewer-tools">
          <nav aria-label="Choose a capture">
            <button v-for="capture in captures" :key="capture.id" type="button" :aria-pressed="selected.id === capture.id" @click="select(capture)">{{ capture.id === 'full' ? 'Full capture' : capture.title }}</button>
          </nav>
          <div class="capture-viewer-actions">
            <button type="button" :aria-pressed="zoomed" :disabled="failed || loading" @click="toggleZoom"><component :is="zoomed ? ZoomOut : ZoomIn" :size="17" aria-hidden="true" />{{ zoomed ? 'Fit to width' : 'Zoom in' }}</button>
            <a :href="selected.src" target="_blank" rel="noreferrer">Open original <ExternalLink :size="15" aria-hidden="true" /></a>
          </div>
        </div>
      </header>
      <div ref="scrollRegion" class="capture-viewer-scroll" :class="{ 'is-zoomed': zoomed }" role="region" aria-label="Image preview; scroll to explore" tabindex="0" :aria-busy="loading">
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

