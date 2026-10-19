import assert from 'node:assert/strict'
import { createServer } from 'vite'

// Exercise the actual navigation state module, without a browser or audio device.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] }, logLevel: 'error' })
try {
  let reduced = false
  let clock = 0
  globalThis.matchMedia = () => ({ matches: reduced })
  globalThis.document = { hidden: false, querySelector: () => ({ focus() {} }) }
  globalThis.requestAnimationFrame = callback => { callback(clock); return 0 }
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { userActivation: { isActive: false } } })
  const state = await server.ssrLoadModule('/src/composables/useProjectOpening.ts')
  Object.defineProperty(globalThis, 'performance', { configurable: true, value: { now: () => clock } })

  state.beginProjectOpening('mwasalaty')
  assert.equal(state.projectOpening.value.ready, false)
  state.skipProjectOpening()
  assert.equal(state.projectOpening.value, null, 'Skip must dismiss even while the hero is pending')

  reduced = true
  state.beginProjectOpening('pwc-middle-east')
  assert.equal(state.projectOpening.value, null, 'Reduced motion must bypass the opening altogether')
  reduced = false

  clock = 0
  state.beginProjectOpening('mwasalaty')
  clock = 1000
  state.markProjectReady('mwasalaty')
  state.beginProjectOpening('inneraura')
  await new Promise(resolve => setTimeout(resolve, 15))
  assert.equal(state.projectOpening.value.slug, 'inneraura', 'An old dismiss timer must not close a later navigation')
  state.markProjectReady('mwasalaty')
  assert.equal(state.projectOpening.value.ready, false, 'A late image from another route must not mark the destination ready')
  state.skipProjectOpening()

  clock = 2000
  state.beginProjectOpening('pwc-middle-east')
  clock = 3000
  state.markProjectReady('pwc-middle-east')
  await new Promise(resolve => setTimeout(resolve, 15))
  assert.equal(state.projectOpening.value, null, 'A ready page must dismiss the opening after its minimum duration')
  console.log('Passed: pending-image Skip, reduced motion, navigation cancellation, late image isolation, ready-page dismissal.')
} finally {
  await server.close()
}
