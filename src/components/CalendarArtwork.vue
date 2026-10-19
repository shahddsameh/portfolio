<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { playProjectSound } from '@/composables/useProjectSound'
import { prefersReducedMotion } from '@/composables/useMotion'

const board = ref<HTMLElement>()
const assembled = ref(false)
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
const monthName = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(today)
const offset = (new Date(year, month, 1).getDay() + 6) % 7
const dayCount = new Date(year, month + 1, 0).getDate()
const cells = computed(() => Array.from({ length: Math.ceil((offset + dayCount) / 7) * 7 }, (_, i) => ({ day: i - offset + 1, row: Math.floor(i / 7), column: i % 7 })))
let observer: ResizeObserver | undefined
let timers: ReturnType<typeof setTimeout>[] = []

function resize() {
  if (!board.value?.clientWidth) return
  const width = board.value.clientWidth
  for (const [i, cell] of Array.from(board.value.querySelectorAll<HTMLElement>('.calendar-cube')).entries()) {
    const style = getComputedStyle(cell), w = parseFloat(style.width), h = parseFloat(style.height)
    cell.style.setProperty('--half', `${h / 2}px`)
    cell.style.setProperty('--side', `${w / 2}px`)
    board.value.style.setProperty('--plane-depth', `${h / 2 + .3}px`)
    const face = cell.querySelector<HTMLElement>('.calendar-image')!
    const imageHeight = width * 3846 / 1600
    face.style.backgroundSize = `${width / w * 100}% ${imageHeight / h * 100}%`
    face.style.backgroundPosition = `${i % 7 / 6 * 100}% ${Math.floor(i / 7) * h / (imageHeight - h) * 100}%`
  }
}
function toggle() {
  timers.forEach(clearTimeout)
  assembled.value = !assembled.value
  playProjectSound('inneraura')
  if (!prefersReducedMotion()) timers = [170, 330, 500].map(delay => setTimeout(() => playProjectSound('inneraura'), delay))
}
onMounted(() => { observer = new ResizeObserver(resize); observer.observe(board.value!); if (board.value?.firstElementChild) observer.observe(board.value.firstElementChild); resize() })
onBeforeUnmount(() => { observer?.disconnect(); timers.forEach(clearTimeout) })
</script>

<template>
  <div class="calendar-artwork" :class="{ 'is-assembled': assembled }" :style="{ '--calendar-rows': Math.ceil(cells.length / 7) }">
    <button type="button" class="calendar-paper" :aria-label="assembled ? 'Return to the calendar' : 'Rotate the calendar to reveal InnerAura'" :aria-pressed="assembled" @click="toggle">
      <div class="calendar-heading"><span>{{ monthName }}</span><span>Illustrative calendar</span></div>
      <div class="calendar-week" aria-hidden="true"><span v-for="day in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']" :key="day">{{ day }}</span></div>
      <div ref="board" class="calendar-spread" role="img" :aria-label="assembled ? 'InnerAura website revealed by the calendar' : `${monthName}, a calendar spread that rotates into InnerAura`" :style="{ '--rows': Math.ceil(cells.length / 7) }">
        <div v-for="(cell, i) in cells" :key="i" class="calendar-cube" :style="{ '--row': cell.row, '--column': cell.column }" aria-hidden="true">
          <div class="calendar-face calendar-date" :class="{ 'is-today': cell.day === today.getDate() }">{{ cell.day > 0 && cell.day <= dayCount ? cell.day : '' }}</div>
          <div class="calendar-face calendar-image" /><div class="calendar-face calendar-side" />
        </div>
        <div class="calendar-complete" aria-hidden="true" />
      </div>
    </button>
    <button type="button" class="artwork-action" :aria-pressed="assembled" @click="toggle">{{ assembled ? 'Return to calendar' : 'Rotate calendar' }}</button>
  </div>
</template>
