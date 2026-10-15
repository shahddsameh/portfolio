<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { profile } from '@/data/profile'

withDefaults(defineProps<{ small?: boolean }>(), { small: false })
</script>

<template>
  <a class="button cv-download" :class="{ 'button-small': small }" :href="profile.cv.href" download>
    <Download :size="small ? 16 : 17" aria-hidden="true" />
    <span class="cv-download-copy"><span>Download CV</span><small>{{ profile.cv.meta }}</small></span>
  </a>
</template>
