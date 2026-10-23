import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import { prefersReducedMotion } from '@/composables/useMotion'
import { beginProjectOpening, cancelProjectOpening } from '@/composables/useProjectOpening'
import { getProject } from '@/data/projects'

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
    // A refresh also carries history.state.scroll. Only Back/Forward should restore it;
    // a fresh home load starts at the hero unless the URL names a section.
    if (from === START_LOCATION && to.path === '/' && !to.hash) return { top: 0, behavior: 'instant' }
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
          resolve({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
        }
        find()
      })
    }
    if (to.path !== from.path) return { top: 0 }
  },
})

router.beforeEach((to, from) => {
  const project = to.params.slug && getProject(String(to.params.slug))
  if (project && to.path !== from.path && from.matched.length && !prefersReducedMotion()) beginProjectOpening(project.slug)
  else cancelProjectOpening()
})
router.afterEach((_to, _from, failure) => { if (failure) cancelProjectOpening() })

// A deploy replaces the hashed view chunks, so a tab opened before it fails to load the next view.
// Load the page fresh instead, once per path so a real outage cannot cause a reload loop.
router.onError((error, to) => {
  cancelProjectOpening()
  if (!/dynamically imported module|Importing a module script failed|error loading dynamically/i.test(String(error?.message))) return
  const key = `chunk-reload:${to.fullPath}`
  try {
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
  } catch {
    return
  }
  window.location.assign(to.fullPath)
})

export default router
