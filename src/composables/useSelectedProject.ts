import { ref } from 'vue'
import type { Project } from '@/types'

// Keep the visitor's place when returning from a case study or moving between
// the home collection and /projects. A fresh visit still opens on Mwasalaty.
export const selectedProjectSlug = ref<Project['slug']>('mwasalaty')
