<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Send } from 'lucide-vue-next'

const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
const form = reactive({ name: '', email: '', subject: '', message: '', company: '' })
const errors = reactive<Record<string, string>>({})
const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const status = ref('')
let lastSubmit = 0

const validate = () => {
  Object.keys(errors).forEach((key) => delete errors[key])
  if (form.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.'
  if (form.subject.trim().length < 3) errors.subject = 'Please add a short subject.'
  if (form.message.trim().length < 20) errors.message = 'Please write at least 20 characters.'
  return Object.keys(errors).length === 0
}

const submit = async () => {
  if (!validate() || form.company) return
  if (Date.now() - lastSubmit < 15000) {
    state.value = 'error'; status.value = 'Please wait a moment before sending again.'; return
  }
  if (!endpoint) {
    state.value = 'error'; status.value = 'The form endpoint is not configured yet. Please email Shahd directly.'; return
  }
  state.value = 'loading'; status.value = 'Sending your message…'
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...form, _replyto: form.email }),
    })
    if (!response.ok) throw new Error('Submission failed')
    lastSubmit = Date.now()
    state.value = 'success'; status.value = 'Thank you—your message has been sent.'
    Object.assign(form, { name: '', email: '', subject: '', message: '', company: '' })
  } catch {
    state.value = 'error'; status.value = 'The message could not be sent. Please email Shahd directly.'
  }
}
</script>

<template>
  <form class="contact-form" novalidate @submit.prevent="submit">
    <div class="honeypot" aria-hidden="true">
      <label for="company">Company</label><input id="company" v-model="form.company" name="company" tabindex="-1" autocomplete="off" />
    </div>
    <div class="field-row">
      <div class="field"><label for="name">Name</label><input id="name" v-model="form.name" name="name" autocomplete="name" :aria-describedby="errors.name ? 'name-error' : undefined" :aria-invalid="!!errors.name" /><p v-if="errors.name" id="name-error" class="field-error">{{ errors.name }}</p></div>
      <div class="field"><label for="email">Email</label><input id="email" v-model="form.email" type="email" name="email" autocomplete="email" :aria-describedby="errors.email ? 'email-error' : undefined" :aria-invalid="!!errors.email" /><p v-if="errors.email" id="email-error" class="field-error">{{ errors.email }}</p></div>
    </div>
    <div class="field"><label for="subject">Subject</label><input id="subject" v-model="form.subject" name="subject" :aria-describedby="errors.subject ? 'subject-error' : undefined" :aria-invalid="!!errors.subject" /><p v-if="errors.subject" id="subject-error" class="field-error">{{ errors.subject }}</p></div>
    <div class="field"><label for="message">Message</label><textarea id="message" v-model="form.message" name="message" rows="5" :aria-describedby="errors.message ? 'message-error' : undefined" :aria-invalid="!!errors.message" /><p v-if="errors.message" id="message-error" class="field-error">{{ errors.message }}</p></div>
    <button class="button button-accent" type="submit" :disabled="state === 'loading'"><Send :size="17" /> {{ state === 'loading' ? 'Sending…' : 'Send message' }}</button>
    <p v-if="status" class="form-status" :class="state" role="status">{{ status }}</p>
  </form>
</template>
