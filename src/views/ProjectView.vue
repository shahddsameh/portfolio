<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, ArrowUpRight, Download, ExternalLink, LockKeyhole, Mail, Maximize2, Plus, X } from 'lucide-vue-next'
import { getProject, projects } from '@/data/projects'
import { useSeo } from '@/composables/useSeo'
import type { CaseImage, Project } from '@/types'

const route = useRoute()
const project = computed(() => getProject(String(route.params.slug))!)
const compact = computed(() => project.value.compact)
// Every case study shares one hero; projects without compact data fall back to their core fields.
const hero = computed(() => {
  const p = project.value
  return {
    lead: p.compact?.lead ?? p.subtitle,
    meta: p.compact?.meta ?? [{ label: 'Role', value: p.role }, { label: 'Team', value: p.team }, { label: 'Year', value: p.year }],
    actions: p.compact?.actions ?? p.links.filter((link) => !link.protected).slice(0, 2),
    note: p.compact?.note,
  }
})
// Break long concept titles after the em dash, keeping the dash with the first line.
const titleParts = computed(() => {
  const [first, ...rest] = project.value.name.split(' — ')
  return rest.length ? [`${first} —`, rest.join(' — ')] : [first]
})
type Section = Project['sections'][number]
// Implementation sections marked group: 'how' fold into one "How it works" section, placed where the first one was.
const displaySections = computed(() => {
  const display: (Section & { how?: Section[] })[] = []
  let how: Section[] | undefined
  for (const section of project.value.sections) {
    if (section.group !== 'how') {
      display.push(section)
      continue
    }
    if (!how) {
      how = []
      display.push({ title: 'How it works', how })
    }
    how.push(section)
  }
  return display
})
const nextProject = computed(() => projects[(projects.findIndex((item) => item.slug === project.value.slug) + 1) % projects.length])

const viewer = ref<HTMLDialogElement>()
const viewerImage = ref<CaseImage>()
const openViewer = (image: CaseImage) => {
  viewerImage.value = image
  viewer.value?.showModal()
}
const closeOnBackdrop = (event: MouseEvent) => event.target === viewer.value && viewer.value?.close()

useSeo(computed(() => ({
  title: `${project.value.name} Case Study — Shahd Sameh`,
  description: project.value.summary,
  path: `/projects/${project.value.slug}`,
  image: project.value.image,
  schema: project.value.compact
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.value.name,
        description: project.value.summary,
        author: { '@type': 'Person', name: 'Shahd Sameh Ahmed' },
        dateCreated: project.value.year,
      }
    : {
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
    <header class="case-hero case-hero--compact page-shell" :class="{ 'case-hero--natural': compact }">
      <RouterLink class="text-link back-link" to="/projects"><ArrowLeft :size="16" /> All projects</RouterLink>
      <h1 class="case-title"><span>{{ titleParts[0] }}</span> <span v-if="titleParts[1]">{{ titleParts[1] }}</span></h1>
      <p class="lead case-lead">{{ hero.lead }}</p>
      <img class="case-hero-image" :src="project.image" :alt="project.imageAlt" :width="compact?.imageWidth ?? 1600" :height="compact?.imageHeight ?? 900" fetchpriority="high" />
      <dl class="case-meta case-meta--row" :style="{ '--meta-count': hero.meta.length }">
        <div v-for="item in hero.meta" :key="item.label"><dt>{{ item.label }}</dt><dd>{{ item.value }}</dd></div>
      </dl>
      <div v-if="hero.actions.length" class="case-actions">
        <a v-for="(action, index) in hero.actions" :key="action.href" class="button" :class="{ 'button-accent': index === 0 }" :href="action.href" target="_blank" rel="noreferrer">{{ action.label }} <ArrowUpRight :size="17" aria-hidden="true" /></a>
      </div>
      <p v-if="hero.note" class="case-note">{{ hero.note }}</p>
    </header>

    <section class="case-section page-shell role-section">
      <div><p class="eyebrow">Contribution boundary</p><h2>What I personally worked on</h2><p class="lead">{{ project.contribution }}</p></div>
      <ul class="contribution-list"><li v-for="item in project.contributions" :key="item">{{ item }}</li></ul>
    </section>

    <section v-if="project.gallery.length" class="project-gallery page-shell" :aria-labelledby="`${project.slug}-gallery-title`">
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

    <section v-for="(section, index) in displaySections" :key="section.title" class="case-section page-shell" :class="{ 'architecture-section': section.title.includes('Architecture') }">
      <div class="case-section-number">{{ String(index + 1).padStart(2, '0') }}</div>
      <div class="case-section-copy">
        <h2>{{ section.title }}</h2>
        <p v-if="section.body">{{ section.body }}</p>
        <div v-if="section.how" class="how-list">
          <details v-for="item in section.how" :key="item.title" class="how-row">
            <summary><span>{{ item.title }}</span><Plus :size="20" aria-hidden="true" /></summary>
            <div class="how-body">
              <p v-if="item.body">{{ item.body }}</p>
              <ul v-if="item.items"><li v-for="point in item.items" :key="point">{{ point }}</li></ul>
            </div>
          </details>
        </div>
        <table v-if="section.table" class="compare-table">
          <thead>
            <tr><component :is="heading ? 'th' : 'td'" v-for="heading in section.table.head" :key="heading" :scope="heading ? 'col' : undefined">{{ heading }}</component></tr>
          </thead>
          <tbody>
            <tr v-for="row in section.table.rows" :key="row[0]">
              <th scope="row">{{ row[0] }}</th>
              <td v-for="cell in row.slice(1)" :key="cell">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
        <ul v-if="section.items" :class="{ 'architecture-list': section.title.includes('Architecture') }">
          <li v-for="item in section.items" :key="item">{{ item }}</li>
        </ul>
        <div v-if="section.title === 'Project links' || section.title === 'Demo link' || section.title === 'GitHub link'" class="case-links">
          <a v-for="link in project.links" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">
            <LockKeyhole v-if="link.protected" :size="15" /><ArrowUpRight v-else :size="15" />{{ link.label }}
          </a>
        </div>
      </div>

      <div v-if="section.images?.length" class="case-media" :class="`case-media--${section.imageLayout ?? 'pair'}`">
        <ul v-if="section.imageLayout === 'phones'" class="phone-row">
          <li v-for="image in section.images" :key="image.src">
            <button type="button" class="phone-frame" @click="openViewer(image)">
              <span class="phone-screen"><img :src="image.src" :alt="image.alt" :width="image.width" :height="image.height" loading="lazy" /></span>
              <span class="phone-open"><Maximize2 :size="14" aria-hidden="true" /> Open full screen</span>
            </button>
          </li>
        </ul>
        <template v-else-if="section.imageLayout === 'wide'">
          <div v-for="image in section.images" :key="image.src" class="wide-scroll" tabindex="0" role="region" :aria-label="image.alt">
            <img :src="image.src" :alt="image.alt" :width="image.width" :height="image.height" loading="lazy" />
          </div>
        </template>
        <div v-else class="case-figures">
          <figure v-for="image in section.images" :key="image.src">
            <div class="case-figure-frame"><img :src="image.src" :alt="image.alt" :width="image.width" :height="image.height" loading="lazy" /></div>
            <figcaption v-if="image.caption">{{ image.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <div class="case-close page-shell">
      <RouterLink class="button button-accent" to="/#contact"><Mail :size="17" aria-hidden="true" /> Contact me</RouterLink>
      <a class="button" href="/files/Shahd_Sameh_CV.pdf" download><Download :size="17" aria-hidden="true" /> Download CV</a>
    </div>

    <nav class="next-project page-shell" aria-label="Next project">
      <span>Next case study</span>
      <RouterLink :to="`/projects/${nextProject.slug}`">{{ nextProject.name }} <ArrowUpRight :size="28" /></RouterLink>
    </nav>

    <dialog ref="viewer" class="image-viewer" :aria-label="viewerImage?.alt" @click="closeOnBackdrop" @close="viewerImage = undefined">
      <button type="button" class="icon-button image-viewer-close" aria-label="Close" @click="viewer?.close()"><X :size="19" aria-hidden="true" /></button>
      <img v-if="viewerImage" :src="viewerImage.src" :alt="viewerImage.alt" :width="viewerImage.width" :height="viewerImage.height" />
    </dialog>
  </article>
</template>
