<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const element = ref<HTMLElement>()
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(([entry]) => entry.isIntersecting && element.value?.classList.add('is-visible'), { threshold: 0.1 })
  if (element.value) observer.observe(element.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div ref="element" class="reveal is-visible-by-default"><slot /></div>
</template>
