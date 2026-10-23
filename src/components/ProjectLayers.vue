<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUpRight, Layers3, Maximize2, RotateCw } from 'lucide-vue-next'
import CaptureViewer from '@/components/CaptureViewer.vue'
import { inspectionCropStyle, projectInspections } from '@/artwork/projectInspection'
import { playProjectSound } from '@/composables/useProjectSound'
import type { Project } from '@/types'

const props = defineProps<{ project: Project }>()
const expanded = ref(false)
const compactMedia = matchMedia('(max-width: 900px)')
const compact = ref(compactMedia.matches)
const inspection = computed(() => projectInspections[props.project.slug])
const captures = computed(() => [inspection.value.full, ...inspection.value.details])
const viewer = ref<InstanceType<typeof CaptureViewer>>()
const previewFailed = ref(false)
const previewLoading = ref(true)
const previewAttempt = ref(0)
const previewSource = computed(() => `${inspection.value.full.src}${previewAttempt.value ? `?retry=${previewAttempt.value}` : ''}`)

function inspect() {
  if (compact.value) void viewer.value?.open(inspection.value.details[0])
  else expanded.value = !expanded.value
  playProjectSound(props.project.slug)
}
function retry() { previewFailed.value = false; previewLoading.value = true; previewAttempt.value++ }
function previewError() { previewFailed.value = true; previewLoading.value = false; expanded.value = false }
function resized() { compact.value = compactMedia.matches; if (compact.value) expanded.value = false }
onMounted(() => compactMedia.addEventListener('change', resized))
onBeforeUnmount(() => compactMedia.removeEventListener('change', resized))
</script>

<template>
  <section class="case-explore page-shell" :aria-labelledby="`${project.slug}-explore-title`">
    <div class="case-explore-heading">
      <h2 :id="`${project.slug}-explore-title`">A closer look.</h2>
      <div class="case-explore-actions">
        <button v-if="inspection.details.length" type="button" class="text-link" :aria-pressed="compact ? undefined : expanded" :aria-haspopup="compact ? 'dialog' : undefined" :disabled="previewFailed" @click="inspect"><Layers3 :size="16" aria-hidden="true" />{{ compact ? 'Inspect details' : expanded ? 'Flatten layers' : 'Inspect layers' }}</button>
        <button type="button" class="text-link" aria-haspopup="dialog" @click="viewer?.open(inspection.full)"><Maximize2 :size="16" aria-hidden="true" /> Open full capture</button>
      </div>
    </div>
    <p class="case-explore-context">{{ inspection.context }}</p>
    <div class="project-layers" :class="[`project-layers--${project.slug}`, { 'is-expanded': expanded }]" :style="{ '--preview-aspect': inspection.previewAspect }">
      <div v-if="previewFailed" class="layer-preview-error" role="alert">
        <p>The preview could not load. You can retry or open the original capture.</p>
        <button type="button" class="text-link" @click="retry"><RotateCw :size="16" aria-hidden="true" /> Try again</button>
        <a class="text-link" :href="inspection.full.src" target="_blank" rel="noreferrer">Open original <ArrowUpRight :size="16" aria-hidden="true" /></a>
      </div>
      <button v-else type="button" class="project-layer-base" aria-haspopup="dialog" :aria-label="`Open full capture: ${inspection.full.title}`" :aria-busy="previewLoading" @click="viewer?.open(inspection.full)">
        <img :key="previewAttempt" :src="previewSource" :alt="inspection.full.alt" :width="inspection.full.width" :height="inspection.full.height" loading="lazy" @load="previewLoading = false" @error="previewError" />
        <span v-if="previewLoading" class="layer-preview-loading" role="status">Loading capture…</span>
        <span v-else class="layer-open-mark" aria-hidden="true"><Maximize2 :size="18" /></span>
      </button>
      <template v-if="expanded && !compact && !previewFailed">
        <button v-for="detail in inspection.details" :key="detail.id" type="button" class="project-layer-detail" :class="detail.layerClass" :style="inspectionCropStyle(detail)" :aria-label="`Open detail: ${detail.title}`" aria-haspopup="dialog" @click="viewer?.open(detail)"><span class="layer-open-mark" aria-hidden="true"><Maximize2 :size="18" /></span></button>
      </template>
    </div>
    <div v-if="inspection.details.length && (expanded || compact)" class="inspection-notes">
      <div v-for="detail in inspection.details" :key="detail.id">
        <button type="button" class="text-link" aria-haspopup="dialog" @click="viewer?.open(detail)">{{ detail.title }} <ArrowUpRight :size="16" aria-hidden="true" /></button>
        <p>{{ detail.description }}</p>
      </div>
    </div>
    <CaptureViewer ref="viewer" :captures="captures" />
  </section>
</template>
