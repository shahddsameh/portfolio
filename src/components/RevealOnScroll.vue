<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const element = ref<HTMLElement>()
let observer: IntersectionObserver | undefined

onMounted(() => {
  const el = element.value
  if (!el) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    el.classList.add('is-visible')
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    el.classList.add('is-visible')
    observer?.disconnect()
  }, { rootMargin: '0px 0px -10% 0px' })
  observer.observe(el)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div ref="element" class="reveal"><slot /></div>
</template>
