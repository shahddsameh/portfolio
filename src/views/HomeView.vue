<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-vue-next'
import { Motion } from '@motionone/vue'
import ContactForm from '@/components/ContactForm.vue'
import DownloadCvLink from '@/components/DownloadCvLink.vue'
import PortraitCard from '@/components/PortraitCard.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import RevealOnScroll from '@/components/RevealOnScroll.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { experience } from '@/data/experience'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { useSeo } from '@/composables/useSeo'
import { firstVisit, prefersReducedMotion } from '@/composables/useMotion'

useSeo({
  title: 'Shahd Sameh — UI/UX Designer',
  description: 'Portfolio of Shahd Sameh, a UI/UX designer working in Figma from user flows and wireframes through prototypes to accessible, developer-ready interfaces, with a front-end background in Vue 3, TypeScript, and Tailwind CSS.',
  path: '/',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: 'https://shahd.site',
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
    sameAs: profile.links.map((link) => link.href),
  },
})

const behance = profile.links.find((link) => link.label === 'Behance')!
// The opening sequence plays once per session; return visits and reduced motion get the settled page.
const intro = !prefersReducedMotion() && firstVisit('intro')
const copyStatus = ref('')
const copySucceeded = ref(false)
let copyStatusTimer: ReturnType<typeof setTimeout> | undefined

const copyEmail = async () => {
  if (copyStatusTimer) clearTimeout(copyStatusTimer)
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
    await navigator.clipboard.writeText(profile.email)
    copyStatus.value = 'Copied'
    copySucceeded.value = true
  } catch {
    copyStatus.value = 'Could not copy. Select the email above.'
    copySucceeded.value = false
  }
  copyStatusTimer = setTimeout(() => { copyStatus.value = '' }, 3500)
}

onBeforeUnmount(() => { if (copyStatusTimer) clearTimeout(copyStatusTimer) })
</script>

<template>
  <div>
    <section class="hero page-shell" :class="{ 'hero--intro': intro }">
      <Motion
        tag="div"
        class="hero-copy"
        :initial="intro ? { opacity: 0, y: 24 } : false"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, easing: [0.22, 1, 0.36, 1] }"
      >
        <p class="eyebrow hero-kicker">Cairo · Egypt <span>Available for opportunities</span></p>
        <h1><span class="first-name-line"><span>Shahd</span> <em>Sameh</em></span><span class="last-name">Ahmed</span></h1>
        <div class="hero-position">
          <p class="hero-title">{{ profile.title }}</p>
          <p>{{ profile.positioning }}</p>
        </div>
        <div class="hero-actions">
          <RouterLink class="button button-accent" to="/projects">View projects <ArrowDownRight :size="18" /></RouterLink>
          <DownloadCvLink />
          <a class="text-link" href="#contact">Contact me <Mail :size="17" /></a>
        </div>
        <div class="role-ticker">
          <!-- The second copy only closes the loop visually; screen readers get the list once. -->
          <div>
            <ul aria-label="Target roles"><li v-for="role in profile.roles" :key="role">{{ role }} <span aria-hidden="true">✦</span></li></ul>
            <ul aria-hidden="true"><li v-for="role in profile.roles" :key="role">{{ role }} <span>✦</span></li></ul>
          </div>
        </div>
      </Motion>
      <Motion
        tag="div"
        class="portrait-wrap"
        :initial="intro ? { opacity: 0, y: -14, scale: 1.03, rotate: 1.8 } : false"
        :animate="{ opacity: 1, y: 0, scale: 1, rotate: 1.8 }"
        :transition="{ duration: 0.6, delay: 0.15, easing: [0.22, 1, 0.36, 1] }"
      >
        <PortraitCard />
      </Motion>
      <a class="scroll-cue" href="#about">Scroll to explore <ArrowDownRight :size="16" /></a>
    </section>

    <RevealOnScroll>
      <section id="about" class="section page-shell">
        <SectionHeading number="01" eyebrow="About" title="A practical eye for the whole product." />
        <div class="about-grid">
          <p class="lead">{{ profile.biography }}</p>
          <dl class="details-grid">
            <div v-for="[label, value] in profile.details" :key="label"><dt>{{ label }}</dt><dd>{{ value }}</dd></div>
          </dl>
        </div>
      </section>
    </RevealOnScroll>

    <RevealOnScroll>
      <section class="section projects-section">
        <div class="page-shell"><SectionHeading number="02" eyebrow="Selected work" title="Three projects, three kinds of problem." /></div>
        <div class="project-editorial page-shell">
          <ProjectCard v-for="(project, index) in projects" :key="project.slug" :project="project" :featured="index === 0" />
        </div>
        <a class="behance-entry page-shell" :href="behance.href" target="_blank" rel="noreferrer">
          <span class="behance-name">{{ behance.label }}</span>
          <span class="behance-note">{{ profile.behanceNote }}</span>
          <ArrowUpRight :size="30" aria-hidden="true" />
        </a>
        <div class="section-action page-shell"><RouterLink class="text-link" to="/projects">See all project details <ArrowUpRight :size="17" /></RouterLink></div>
      </section>
    </RevealOnScroll>

    <RevealOnScroll>
      <section class="section page-shell">
        <SectionHeading number="03" eyebrow="Experience" title="Learning across products and industries." />
        <div class="timeline">
          <article v-for="item in experience" :key="item.role">
            <time>{{ item.date }}</time><div><h3>{{ item.role }}</h3><p class="company">{{ item.company }}</p><p>{{ item.bullets[0] }}</p></div>
          </article>
        </div>
        <RouterLink class="text-link" to="/resume">Read the full résumé <ArrowUpRight :size="17" /></RouterLink>
      </section>
    </RevealOnScroll>

    <RevealOnScroll>
      <section id="contact" class="section contact-section page-shell">
        <div>
          <SectionHeading number="04" eyebrow="Contact" title="Have a thoughtful problem to solve?" />
          <p class="lead">I’m open to design, front-end, and product-minded software opportunities. Tell me what you’re building.</p>
          <div class="contact-links">
            <span class="contact-email"><a :href="`mailto:${profile.email}`">{{ profile.email }}</a><button type="button" class="copy-email-button" @click="copyEmail">Copy email</button><span class="copy-email-status" :class="{ 'is-copied': copySucceeded }" role="status">{{ copyStatus }}</span></span>
            <a :href="`tel:${profile.phone.replaceAll(' ', '')}`">{{ profile.phone }}</a>
            <a v-for="link in profile.links" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">{{ link.label }} <ArrowUpRight :size="13" aria-hidden="true" /></a>
          </div>
        </div>
        <ContactForm />
      </section>
    </RevealOnScroll>
  </div>
</template>
