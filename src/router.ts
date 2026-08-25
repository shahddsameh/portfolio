import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue') },
    { path: '/projects', component: () => import('@/views/ProjectsView.vue') },
    { path: '/projects/:slug(mwasalaty|inneraura|service-hub)', component: () => import('@/views/ProjectView.vue') },
    { path: '/resume', component: () => import('@/views/ResumeView.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFoundView.vue') },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (to.path !== from.path) return { top: 0 }
  },
})

export default router
