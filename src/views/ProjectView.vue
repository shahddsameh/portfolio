<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, ArrowUpRight, ExternalLink, LockKeyhole } from 'lucide-vue-next'
import { getProject, projects } from '@/data/projects'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()
const project = computed(() => getProject(String(route.params.slug))!)
const nextProject = computed(() => projects[(projects.findIndex((item) => item.slug === project.value.slug) + 1) % projects.length])

useSeo(computed(() => ({
  title: `${project.value.name} Case Study — Shahd Sameh`,
  description: project.value.summary,
  path: `/projects/${project.value.slug}`,
  image: project.value.image,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.value.name,
    description: project.value.summary,
    author: { '@type': 'Person', name: 'Shahd Sameh Ahmed' },
    dateCreated: project.value.year,
    applicationCategory: 'WebApplication',
  },
})))
</script>

<template>
  <article class="case-study">
    <header class="case-hero page-shell">
      <RouterLink class="text-link back-link" to="/projects"><ArrowLeft :size="16" /> All projects</RouterLink>
      <p class="eyebrow">{{ project.year }} · {{ project.team }}</p>
      <h1>{{ project.name }}</h1>
      <p class="case-subtitle">{{ project.subtitle }}</p>
      <dl class="case-meta">
        <div><dt>Role</dt><dd>{{ project.role }}</dd></div>
        <div><dt>Team</dt><dd>{{ project.team }}</dd></div>
        <div><dt>Year</dt><dd>{{ project.year }}</dd></div>
      </dl>
      <img class="case-hero-image" :src="project.image" :alt="project.imageAlt" width="1600" height="980" />
      <p v-if="project.image.includes('placeholder')" class="asset-disclosure">This labeled panel marks an unavailable product capture; it is not a recreation of the interface.</p>
    </header>

    <section class="case-section page-shell role-section">
      <div><p class="eyebrow">Contribution boundary</p><h2>What I personally worked on</h2><p class="lead">{{ project.contribution }}</p></div>
      <ul class="contribution-list"><li v-for="item in project.contributions" :key="item">{{ item }}</li></ul>
    </section>

    <section class="project-gallery page-shell" :aria-labelledby="`${project.slug}-gallery-title`">
      <div class="gallery-heading">
        <p class="eyebrow">Product evidence</p>
        <h2 :id="`${project.slug}-gallery-title`">A closer look at the interface.</h2>
        <p>These are real captures from the working project. Preview crops preserve detail; each image opens at its complete aspect ratio.</p>
      </div>
      <div class="gallery-grid" :class="`gallery-${project.slug}`">
        <figure v-for="(image, index) in project.gallery" :key="image.src" :class="[image.orientation, { featured: index === 0 }]">
          <a class="gallery-image-frame" :href="image.src" target="_blank" rel="noreferrer" :aria-label="`Open full ${project.name} screenshot: ${image.caption}`">
            <img :src="image.src" :alt="image.alt" width="1600" height="1000" loading="lazy" />
            <span>Open full capture <ExternalLink :size="14" aria-hidden="true" /></span>
          </a>
          <figcaption><b>{{ String(index + 1).padStart(2, '0') }}</b>{{ image.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <section v-for="(section, index) in project.sections" :key="section.title" class="case-section page-shell" :class="{ 'architecture-section': section.title.includes('Architecture') }">
      <div class="case-section-number">{{ String(index + 1).padStart(2, '0') }}</div>
      <div class="case-section-copy">
        <p class="eyebrow">{{ project.name }} / Case study</p>
        <h2>{{ section.title }}</h2>
        <p>{{ section.body }}</p>
        <ul v-if="section.items" :class="{ 'architecture-list': section.title.includes('Architecture') }">
          <li v-for="item in section.items" :key="item">{{ item }}</li>
        </ul>
        <div v-if="section.title === 'Project links' || section.title === 'Demo link' || section.title === 'GitHub link'" class="case-links">
          <a v-for="link in project.links" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">
            <LockKeyhole v-if="link.protected" :size="15" /><ArrowUpRight v-else :size="15" />{{ link.label }}
          </a>
        </div>
      </div>
    </section>

    <nav class="next-project page-shell" aria-label="Next project">
      <span>Next case study</span>
      <RouterLink :to="`/projects/${nextProject.slug}`">{{ nextProject.name }} <ArrowUpRight :size="28" /></RouterLink>
    </nav>
  </article>
</template>
