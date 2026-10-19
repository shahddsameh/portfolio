import { ref } from 'vue'
import type { Project } from '@/types'

const storageKey = 'shahd-project-sound'
const savedPreference = () => {
  try { return localStorage.getItem(storageKey) !== 'off' } catch { return true }
}
export const projectSoundEnabled = ref(savedPreference())
let context: AudioContext | undefined

export function toggleProjectSound() {
  projectSoundEnabled.value = !projectSoundEnabled.value
  try { localStorage.setItem(storageKey, projectSoundEnabled.value ? 'on' : 'off') } catch { /* Storage is optional. */ }
}

/** Only called by deliberate project interactions. No audio starts on page load. */
export function playProjectSound(slug: Project['slug'], arrival = false) {
  if (!projectSoundEnabled.value || document.hidden) return
  try {
    // Delayed loading cues may use an unlocked context, but cannot create one.
    if (!context && !navigator.userActivation?.isActive) return
    context ??= new AudioContext()
    if (context.state === 'suspended') {
      if (!navigator.userActivation?.isActive) return
      void context.resume().catch(() => {})
    }
    const now = context.currentTime
    const paper = slug === 'mwasalaty' || (slug === 'pwc-middle-east' && !arrival)
    const duration = paper ? (slug === 'mwasalaty' ? .19 : .14) : .085
    const gain = context.createGain()
    gain.connect(context.destination)
    gain.gain.setValueAtTime(.0001, now)
    gain.gain.exponentialRampToValueAtTime(arrival ? .035 : .022, now + .008)
    gain.gain.exponentialRampToValueAtTime(.0001, now + duration)
    if (paper) {
      const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate)
      const samples = buffer.getChannelData(0)
      for (let i = 0; i < samples.length; i++) samples[i] = (Math.random() * 2 - 1) * (.6 + .4 * Math.sin(i * .014))
      const source = context.createBufferSource()
      const filter = context.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = slug === 'mwasalaty' ? 1450 : 1800
      filter.Q.value = .65
      source.buffer = buffer
      source.connect(filter).connect(gain)
      source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect() }
      source.start(now)
      source.stop(now + duration)
    } else {
      const oscillator = context.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(slug === 'inneraura' ? 460 : 850, now)
      oscillator.frequency.exponentialRampToValueAtTime(180, now + duration)
      oscillator.connect(gain)
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
      oscillator.start(now)
      oscillator.stop(now + duration)
    }
  } catch { /* Audio is an enhancement; a blocked context never interrupts navigation. */ }
}
