<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { Download, RotateCcw } from 'lucide-vue-next'
import { profile } from '@/data/profile'
import { canHover, prefersReducedMotion } from '@/composables/useMotion'

// The portrait is a printed card: turn it over for contact details, and on desktop it lifts toward the cursor.
const flipped = ref(false)
const tilting = ref(false)
const card = ref<HTMLElement>()
const front = ref<HTMLButtonElement>()
const back = ref<HTMLButtonElement>()
let frame = 0

const turn = async (toBack: boolean) => {
  flipped.value = toBack
  resetTilt()
  await nextTick()
  ;(toBack ? back : front).value?.focus({ preventScroll: true })
}

const tiltTo = (event: PointerEvent) => {
  if (flipped.value || event.pointerType !== 'mouse' || !canHover() || prefersReducedMotion()) return
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    const el = card.value
    if (!el) return
    const box = el.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - 0.5
    const y = (event.clientY - box.top) / box.height - 0.5
    el.style.setProperty('--tilt-x', `${(x * 6).toFixed(2)}deg`)
    el.style.setProperty('--tilt-y', `${(-y * 6).toFixed(2)}deg`)
    tilting.value = true
  })
}
const resetTilt = () => {
  cancelAnimationFrame(frame)
  tilting.value = false
  card.value?.style.removeProperty('--tilt-x')
  card.value?.style.removeProperty('--tilt-y')
}
onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <div class="portrait-note" :class="{ 'is-hidden': flipped }">Profile / 2026</div>
  <div ref="card" class="portrait-card" :class="{ 'is-flipped': flipped, 'is-tilting': tilting }" @pointermove="tiltTo" @pointerleave="resetTilt">
    <button ref="front" type="button" class="portrait-front" :inert="flipped || undefined" aria-label="Turn the photo over for contact details" @click="turn(true)">
      <img src="/images/profile/shahd-portrait.png" alt="Portrait of Shahd Sameh Ahmed in an editorial paper-card composition" width="1122" height="1402" fetchpriority="high" />
      <span class="portrait-turn" aria-hidden="true"><RotateCcw :size="13" /> Turn over</span>
    </button>
    <div class="portrait-back" :inert="!flipped || undefined" @keydown.esc="turn(false)">
      <p class="portrait-back-kicker">{{ profile.location }}</p>
      <p class="portrait-back-name">{{ profile.name }}</p>
      <p class="portrait-back-title">{{ profile.title }}</p>
      <p class="portrait-back-status">Available for opportunities</p>
      <a class="portrait-back-link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
      <a class="button button-small" :href="profile.cv.href" download><Download :size="15" aria-hidden="true" /> Download CV</a>
      <button ref="back" type="button" class="portrait-back-turn" @click="turn(false)"><RotateCcw :size="14" aria-hidden="true" /> Turn back</button>
    </div>
  </div>
  <p class="portrait-caption">Building at the intersection of interface, product, and code.</p>
</template>
