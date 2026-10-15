import { ref } from 'vue'
import { prefersReducedMotion } from '@/composables/useMotion'

export const projectViewTransitionSlug = ref<string | null>(null)

export function canUseProjectViewTransition() {
  return typeof document.startViewTransition === 'function' && !prefersReducedMotion()
}
