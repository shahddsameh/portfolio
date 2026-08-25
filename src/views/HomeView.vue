<script setup lang="ts">
import { ArrowDownRight, ArrowUpRight, Download, Mail } from 'lucide-vue-next'
import { Motion } from '@motionone/vue'
import ContactForm from '@/components/ContactForm.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import RevealOnScroll from '@/components/RevealOnScroll.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { experience } from '@/data/experience'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Shahd Sameh — UI/UX Designer',
  description: 'Portfolio of Shahd Sameh, a UI/UX designer working in Figma from user flows and wireframes through prototypes to accessible, developer-ready interfaces, with a front-end background in Vue 3, TypeScript, and Tailwind CSS.',
  path: '/',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: 'https://shahd.me',
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
    sameAs: profile.links.map((link) => link.href),
  },
})

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
</script>

<template>
  <div>
    <section class="hero page-shell">
      <Motion
        tag="div"
        class="hero-copy"
        :initial="reduceMotion ? false : { opacity: 0, y: 24 }"
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
          <a class="button" href="/files/Shahd_Sameh_CV.pdf" download><Download :size="17" /> Download CV</a>
          <a class="text-link" href="#contact">Contact me <Mail :size="17" /></a>
        </div>
        <div class="role-ticker" aria-label="Target roles">
          <div><span v-for="role in [...profile.roles, ...profile.roles]" :key="`${role}-${Math.random()}`">{{ role }} <b>✦</b></span></div>
        </div>
      </Motion>
      <Motion
        tag="div"
        class="portrait-wrap"
        :initial="reduceMotion ? false : { opacity: 0, x: 28, rotate: 1.8 }"
        :animate="{ opacity: 1, x: 0, rotate: 1.8 }"
        :transition="{ duration: 0.6, delay: 0.1, easing: [0.22, 1, 0.36, 1] }"
      >
        <div class="portrait-note">Profile / 2026</div>
        <img src="/images/profile/shahd-portrait.png" alt="Portrait of Shahd Sameh Ahmed in an editorial paper-card composition" width="1122" height="1402" fetchpriority="high" />
        <p>Building at the intersection of interface, product, and code.</p>
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
        <div class="section-action page-shell"><RouterLink class="text-link" to="/projects">See all project details <ArrowUpRight :size="17" /></RouterLink></div>
      </section>
    </RevealOnScroll>

    <RevealOnScroll>
      <section id="services" class="section page-shell">
        <SectionHeading number="03" eyebrow="Services" title="From early structure to shipped interface." />
        <div class="services-grid">
          <article v-for="(service, index) in services" :key="service.title">
            <span>0{{ index + 1 }}</span><h3>{{ service.title }}</h3><p>{{ service.description }}</p>
          </article>
        </div>
      </section>
    </RevealOnScroll>

    <RevealOnScroll>
      <section class="section page-shell">
        <SectionHeading number="04" eyebrow="Experience" title="Learning across products and industries." />
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
          <SectionHeading number="05" eyebrow="Contact" title="Have a thoughtful problem to solve?" />
          <p class="lead">I’m open to design, front-end, and product-minded software opportunities. Tell me what you’re building.</p>
          <div class="contact-links">
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            <a :href="`tel:${profile.phone.replaceAll(' ', '')}`">{{ profile.phone }}</a>
            <a v-for="link in profile.links" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">{{ link.label }} ↗</a>
          </div>
        </div>
        <ContactForm />
      </section>
    </RevealOnScroll>
  </div>
</template>
