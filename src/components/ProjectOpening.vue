<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-vue-next'
import { projectOpening, skipProjectOpening } from '@/composables/useProjectOpening'
import { getProject } from '@/data/projects'

const skip = ref<HTMLButtonElement>()
const name = computed(() => projectOpening.value ? getProject(projectOpening.value.slug)?.name : '')
let previousOverflow = ''
watch(() => projectOpening.value?.id, async (id, previous) => {
  if (id && !previous) { previousOverflow = document.documentElement.style.overflow; document.documentElement.style.overflow = 'hidden' }
  if (!id && previous) document.documentElement.style.overflow = previousOverflow
  if (id) { await nextTick(); skip.value?.focus({ preventScroll: true }) }
})
onBeforeUnmount(() => { document.documentElement.style.overflow = previousOverflow })
</script>

<template>
  <Transition name="opening">
    <div v-if="projectOpening" :key="projectOpening.id" class="project-opening" role="dialog" aria-modal="true" :aria-label="`Opening ${name}`">
      <button ref="skip" type="button" class="opening-skip" @click="skipProjectOpening" @keydown.tab.prevent="skip?.focus()" @keydown.esc="skipProjectOpening">Skip animation <ArrowRight :size="16" aria-hidden="true" /></button>
      <div v-if="projectOpening.slug === 'mwasalaty'" class="opening-art opening-route">
        <svg viewBox="0 0 420 190" role="img" aria-label="A route connects to its destination">
          <path class="opening-track" d="M30 140H126Q156 140 156 110V82Q156 55 184 55H274Q300 55 300 80V110Q300 136 330 136H386" />
          <path class="opening-line" pathLength="1" d="M30 140H126Q156 140 156 110V82Q156 55 184 55H274Q300 55 300 80V110Q300 136 330 136H386" />
          <circle v-for="(point, i) in [[30,140],[156,82],[274,55],[386,136]]" :key="i" class="opening-stop" :cx="point[0]" :cy="point[1]" r="6" :style="{ animationDelay: `${i * .13}s` }" />
        </svg>
        <MapPin class="opening-pin" :size="34" aria-hidden="true" />
      </div>
      <div v-else-if="projectOpening.slug === 'pwc-middle-east'" class="opening-art opening-access" aria-hidden="true">
        <span v-for="i in 4" :key="i" class="opening-access-frame" :style="{ '--i': i - 1 }" />
        <ArrowUpRight class="opening-access-arrow" :size="32" />
      </div>
      <div v-else class="opening-art opening-calendar" aria-hidden="true"><span v-for="i in 21" :key="i" :style="{ '--i': (i - 1) % 7 + Math.floor((i - 1) / 7) * 2 }">{{ i }}</span></div>
      <p class="opening-title">{{ name }}</p>
      <p class="opening-label" role="status">Opening case study</p>
    </div>
  </Transition>
</template>
