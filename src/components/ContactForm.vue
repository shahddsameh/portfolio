<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue'
import { Send } from 'lucide-vue-next'
import { profile } from '@/data/profile'

const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
const fields = ['name', 'email', 'subject', 'message'] as const
const form = reactive({ name: '', email: '', subject: '', message: '', company: '' })
const errors = reactive<Record<string, string>>({})
const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const status = ref('')
// Failures that the visitor can work around by writing to Shahd's inbox get the address beside the message.
const offerEmail = ref(false)
const attempted = ref(false)
let lastSubmit = 0

const validate = () => {
  Object.keys(errors).forEach((key) => delete errors[key])
  if (form.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.'
  if (form.subject.trim().length < 3) errors.subject = 'Please add a short subject.'
  if (form.message.trim().length < 20) errors.message = 'Please write at least 20 characters.'
  return Object.keys(errors).length === 0
}
// After the first attempt, errors clear as soon as a field is fixed.
watch(form, () => attempted.value && validate())

const report = (next: typeof state.value, text: string, email = false) => {
  state.value = next; status.value = text; offerEmail.value = email
}

const submit = async () => {
  if (state.value === 'loading') return
  attempted.value = true
  if (!validate()) {
    await nextTick()
    const first = fields.find((field) => errors[field])
    if (first) document.getElementById(first)?.focus()
    return
  }
  if (form.company) return
  if (Date.now() - lastSubmit < 15000) return report('error', 'Please wait a moment before sending again.')
  if (!endpoint) return report('error', 'The form endpoint is not configured yet. Please email Shahd directly', true)
  if (!navigator.onLine) return report('error', 'You appear to be offline. Your message is still here, so you can send it once you reconnect, or email Shahd directly', true)

  report('loading', 'Sending your message…')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(), email: form.email.trim(), subject: form.subject.trim(), message: form.message.trim(),
        company: form.company, _replyto: form.email.trim(),
      }),
      signal: controller.signal,
    })
    if (response.status === 429) return report('error', 'Too many messages were sent just now. Please try again in a few minutes, or email Shahd directly', true)
    if (!response.ok) throw new Error(`Submission failed (${response.status})`)
    lastSubmit = Date.now()
    attempted.value = false
    Object.assign(form, { name: '', email: '', subject: '', message: '', company: '' })
    report('success', 'Thank you—your message has been sent.')
  } catch {
    if (controller.signal.aborted) report('error', 'Sending is taking too long. Your message is still here, so you can try again, or email Shahd directly', true)
    else report('error', 'The message could not be sent. Please email Shahd directly', true)
  } finally {
    clearTimeout(timeout)
  }
}
</script>

<template>
  <form class="contact-form" novalidate :aria-busy="state === 'loading'" @submit.prevent="submit">
    <div class="honeypot" aria-hidden="true">
      <label for="company">Company</label><input id="company" v-model="form.company" name="company" tabindex="-1" autocomplete="off" />
    </div>
    <div class="field-row">
      <div class="field"><label for="name">Name</label><input id="name" v-model="form.name" name="name" autocomplete="name" maxlength="100" :aria-describedby="errors.name ? 'name-error' : undefined" :aria-invalid="!!errors.name" /><p v-if="errors.name" id="name-error" class="field-error">{{ errors.name }}</p></div>
      <div class="field"><label for="email">Email</label><input id="email" v-model="form.email" type="email" name="email" autocomplete="email" maxlength="254" spellcheck="false" :aria-describedby="errors.email ? 'email-error' : undefined" :aria-invalid="!!errors.email" /><p v-if="errors.email" id="email-error" class="field-error">{{ errors.email }}</p></div>
    </div>
    <div class="field"><label for="subject">Subject</label><input id="subject" v-model="form.subject" name="subject" maxlength="150" :aria-describedby="errors.subject ? 'subject-error' : undefined" :aria-invalid="!!errors.subject" /><p v-if="errors.subject" id="subject-error" class="field-error">{{ errors.subject }}</p></div>
    <div class="field"><label for="message">Message</label><textarea id="message" v-model="form.message" name="message" rows="5" maxlength="5000" :aria-describedby="errors.message ? 'message-error' : undefined" :aria-invalid="!!errors.message" /><p v-if="errors.message" id="message-error" class="field-error">{{ errors.message }}</p></div>
    <button class="button button-accent" type="submit" :disabled="state === 'loading'"><Send :size="17" aria-hidden="true" /> {{ state === 'loading' ? 'Sending…' : 'Send message' }}</button>
    <!-- The live region stays mounted so screen readers announce each new status. -->
    <p class="form-status" :class="state" role="status">{{ status }}<template v-if="offerEmail"> at <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>.</template></p>
  </form>
</template>
