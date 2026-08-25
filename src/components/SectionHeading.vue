<script setup lang="ts">
defineProps<{ number: string; eyebrow: string; title: string }>()
</script>

<template>
  <div class="section-heading">
    <span class="section-number" aria-hidden="true">{{ number }}</span>
    <div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>
