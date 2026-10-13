<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { onceInView } from '@/composables/useMotion'

const element = ref<HTMLElement>()
let stop = () => {}

onMounted(() => {
  const el = element.value
  if (el) stop = onceInView(el, () => el.classList.add('is-visible'))
})
onUnmounted(() => stop())
</script>

<template>
  <div ref="element" class="reveal"><slot /></div>
</template>
