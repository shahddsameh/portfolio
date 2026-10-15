<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '@/types'
import { canUseProjectViewTransition, projectViewTransitionSlug } from '@/composables/useProjectViewTransition'
// Cards sit under a section h2 on home but directly under the page h1 on /projects.
const props = withDefaults(defineProps<{ project: Project; featured?: boolean; headingLevel?: 2 | 3 }>(), { headingLevel: 3 })
const router = useRouter()
const image = ref<HTMLImageElement>()

const openProject = async (event: MouseEvent, navigate: (event: MouseEvent) => Promise<unknown>) => {
  const box = image.value?.getBoundingClientRect()
  const imageIsVisible = box && box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !canUseProjectViewTransition() || !image.value?.complete || !image.value.naturalWidth || !imageIsVisible) {
    void navigate(event)
    return
  }

  event.preventDefault()
  projectViewTransitionSlug.value = props.project.slug
  await nextTick()
  try {
    const transition = document.startViewTransition(async () => {
      await router.push(`/projects/${props.project.slug}`)
      await nextTick()
    })
    void transition.finished.catch(() => {}).finally(() => { projectViewTransitionSlug.value = null })
  } catch {
    projectViewTransitionSlug.value = null
    void router.push(`/projects/${props.project.slug}`)
  }
}
</script>

<template>
  <article class="project-card" :class="{ featured }">
    <div class="project-image-wrap" :class="{ placeholder: project.image.includes('placeholder') }">
      <img ref="image" :src="project.image" :alt="project.imageAlt" :style="{ viewTransitionName: projectViewTransitionSlug === project.slug ? `project-${project.slug}` : 'none' }" width="1600" height="980" loading="lazy" />
    </div>
    <div class="project-card-content">
      <div class="project-index">{{ project.year }} · {{ project.role }}</div>
      <component :is="`h${headingLevel}`" class="project-card-title"><RouterLink :to="`/projects/${project.slug}`" custom v-slot="{ href, navigate }"><a class="project-card-link" :href="href" @click="openProject($event, navigate)">{{ project.name }}</a></RouterLink></component>
      <p>{{ project.summary }}</p>
      <p v-if="project.contributions.length" class="project-contribution"><span>My contribution</span><mark class="ink-mark">{{ project.contributions.slice(0, 3).join(' · ') }}</mark></p>
      <div class="tag-list" aria-label="Technologies">
        <span v-for="tech in project.technologies.slice(0, featured ? 6 : 4)" :key="tech">{{ tech }}</span>
      </div>
      <span class="text-link" aria-hidden="true">View case study <ArrowUpRight :size="17" /></span>
    </div>
  </article>
</template>
