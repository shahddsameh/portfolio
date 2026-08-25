<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { experience } from '@/data/experience'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Résumé — Shahd Sameh',
  description: 'Experience, education, projects, and technical skills of UI/UX-focused front-end developer Shahd Sameh.',
  path: '/resume',
})
</script>

<template>
  <div class="page-shell resume-page">
    <header class="resume-header">
      <div><p class="eyebrow">Curriculum vitae · 2026</p><h1>Shahd Sameh<br /><em>Ahmed</em></h1></div>
      <div><p>{{ profile.title }}</p><a :href="`mailto:${profile.email}`">{{ profile.email }}</a><p>{{ profile.location }}</p><a class="button button-accent" href="/files/Shahd_Sameh_CV.pdf" download><Download :size="17" /> Download CV</a></div>
    </header>
    <section class="resume-section"><p class="resume-label">Profile</p><p class="lead">UI/UX-focused front-end developer with a BSc in Business Information Systems and a 3.95 GPA, experienced in designing and delivering responsive, accessible, WCAG-compliant web applications from wireframe to deployment. Recently led a five-person team in completing and deploying Mwasalaty, a multimodal Cairo transit PWA, on AWS. Strong in Figma, Vue 3, TypeScript, Tailwind CSS, and JavaScript, with product thinking across the full software delivery lifecycle.</p></section>
    <section class="resume-section"><p class="resume-label">Education</p><div class="resume-entry"><div><h2>Helwan University</h2><p>BSc in Business Information Systems</p></div><div><p>Aug 2021 — Jun 2025</p><p>GPA: 3.95 / 4.0</p></div></div></section>
    <section class="resume-section"><p class="resume-label">Experience</p><article v-for="item in experience" :key="item.role" class="resume-entry"><div><h2>{{ item.role }}</h2><p>{{ item.company }}</p></div><div><time>{{ item.date }}</time><ul><li v-for="bullet in item.bullets" :key="bullet">{{ bullet }}</li></ul></div></article></section>
    <section class="resume-section"><p class="resume-label">Projects</p><article v-for="project in projects" :key="project.slug" class="resume-entry"><div><h2>{{ project.name }}</h2><p>{{ project.role }}</p></div><div><p>{{ project.summary }}</p><p class="muted">{{ project.technologies.join(' · ') }}</p></div></article></section>
    <section class="resume-section"><p class="resume-label">Skills & tools</p><div class="skill-groups"><div v-for="group in skillGroups" :key="group.title"><h2>{{ group.title }}</h2><p>{{ group.items.join(' · ') }}</p></div></div></section>
    <section class="resume-section"><p class="resume-label">Languages</p><div class="language-row"><p>Arabic <span>Native</span></p><p>English <span>Professional working proficiency</span></p><p>French <span>Beginner</span></p></div></section>
  </div>
</template>
