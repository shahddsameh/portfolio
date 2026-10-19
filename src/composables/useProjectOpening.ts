import { shallowRef } from 'vue'
import { prefersReducedMotion } from '@/composables/useMotion'
import { playProjectSound } from '@/composables/useProjectSound'
import type { Project } from '@/types'

type Opening = { slug: Project['slug']; ready: boolean; id: number }
export const projectOpening = shallowRef<Opening | null>(null)
let started = 0
let sequence = 0
let timer: ReturnType<typeof setTimeout> | undefined

export function cancelProjectOpening() {
  clearTimeout(timer)
  projectOpening.value = null
}

export function beginProjectOpening(slug: Project['slug']) {
  cancelProjectOpening()
  if (prefersReducedMotion()) return
  started = performance.now()
  projectOpening.value = { slug, ready: false, id: ++sequence }
  playProjectSound(slug)
}

function dismiss() {
  const slug = projectOpening.value?.slug
  cancelProjectOpening()
  if (slug) playProjectSound(slug, true)
  requestAnimationFrame(() => document.querySelector<HTMLElement>('.case-title')?.focus({ preventScroll: true }))
}

export function markProjectReady(slug: Project['slug']) {
  const current = projectOpening.value
  if (!current || current.slug !== slug || current.ready) return
  projectOpening.value = { ...current, ready: true }
  const minimum = prefersReducedMotion() ? 0 : 850
  timer = setTimeout(() => {
    if (projectOpening.value?.id === current.id) dismiss()
  }, Math.max(0, minimum - (performance.now() - started)))
}

export function skipProjectOpening() {
  if (projectOpening.value) dismiss()
}
