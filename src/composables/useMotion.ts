// Shared motion helpers. Every effect on the site checks prefersReducedMotion() and has a static path.

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/** True when the device has a precise pointer that can hover (desktop mice and trackpads). */
export const canHover = () => matchMedia('(hover: hover) and (pointer: fine)').matches

/** Runs `callback` once, the first time `el` scrolls into view. Returns a cleanup function. */
export function onceInView(el: Element, callback: () => void, rootMargin = '0px 0px -10% 0px') {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    callback()
    return () => {}
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    callback()
    observer.disconnect()
  }, { rootMargin })
  observer.observe(el)
  return () => observer.disconnect()
}

/** True only the first time it is called for `key` in this browser session. Storage can throw when site data is blocked. */
export function firstVisit(key: string) {
  try {
    const storageKey = `seen:${key}`
    if (sessionStorage.getItem(storageKey)) return false
    sessionStorage.setItem(storageKey, '1')
  } catch {}
  return true
}
