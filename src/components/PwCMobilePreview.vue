<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Search } from 'lucide-vue-next'

const failed = ref(false)
</script>

<template>
  <div class="pwc-mobile-artwork">
    <div class="pwc-device">
      <span class="pwc-device-speaker" aria-hidden="true" />
      <div class="pwc-phone-screen">
        <!-- A static presentation of the captured navigation, not a live product menu. -->
        <div class="pwc-phone-nav" aria-hidden="true">
          <span class="pwc-phone-brand" />
          <span class="pwc-phone-language"><span>EN</span><span lang="ar" dir="rtl">عربي</span></span>
          <Search /><Menu />
        </div>
        <div class="pwc-phone-scroll" role="region" aria-label="PwC mobile Home preview" aria-describedby="pwc-phone-hint" tabindex="0">
          <img v-if="!failed" src="/images/projects/pwc/home-hero.webp" alt="PwC Middle East Home design with its featured story, featured insights, and regional practices and sectors" width="812" height="2640" loading="lazy" decoding="async" @error="failed = true" />
          <p v-else class="pwc-phone-unavailable">Home preview unavailable.</p>
        </div>
      </div>
      <span class="pwc-device-home" aria-hidden="true" />
    </div>
    <span id="pwc-phone-hint" class="pwc-phone-hint">Scroll to explore</span>
  </div>
</template>
