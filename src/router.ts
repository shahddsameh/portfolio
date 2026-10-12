import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue') },
    { path: '/projects', component: () => import('@/views/ProjectsView.vue') },
    { path: '/projects/:slug(pwc-middle-east|mwasalaty|inneraura|service-hub)', component: () => import('@/views/ProjectView.vue') },
    { path: '/resume', component: () => import('@/views/ResumeView.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFoundView.vue') },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      // The out-in page transition mounts the next view late, so wait for the target to exist.
      return new Promise((resolve) => {
        const started = performance.now()
        const find = () => {
          if (document.querySelector(to.hash)) resolve({ el: to.hash, behavior: 'smooth' })
          else if (performance.now() - started > 1500) resolve({ top: 0 })
          else requestAnimationFrame(find)
        }
        find()
      })
    }
    if (to.path !== from.path) return { top: 0 }
  },
})

export default router
