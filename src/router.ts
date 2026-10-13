import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue') },
    { path: '/projects', component: () => import('@/views/ProjectsView.vue') },
    { path: '/projects/:slug(pwc-middle-east|mwasalaty|inneraura)', component: () => import('@/views/ProjectView.vue') },
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
          const target = document.querySelector<HTMLElement>(to.hash)
          if (!target) {
            if (performance.now() - started > 1500) resolve({ top: 0 })
            else requestAnimationFrame(find)
            return
          }
          // offsetTop ignores the reveal transform, and the router's own `el` option ignores
          // scroll-padding-top, which would leave the section under the sticky header.
          let top = -parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop || '0')
          for (let node: HTMLElement | null = target; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop
          resolve({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
        }
        find()
      })
    }
    if (to.path !== from.path) return { top: 0 }
  },
})

export default router
