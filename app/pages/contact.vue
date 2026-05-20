<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()

const socialSectionRef = ref<HTMLElement | null>(null)
const formSectionRef = ref<HTMLElement | null>(null)

const form = reactive({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const isSuccess = ref(false)
const serverError = ref('')

let ctx: gsap.Context | null = null
let socialCtx: gsap.Context | null = null
let formCtx: gsap.Context | null = null

const socials = [
  { key: 'socialGithub', icon: 'pi-github', url: 'https://github.com/npminit-dev', label: 'GitHub' },
  { key: 'socialLinkedin', icon: 'pi-linkedin', url: 'https://www.linkedin.com/in/jorge-balsamo-dev/', label: 'LinkedIn' },

  { key: 'socialEmail', icon: 'pi-envelope', url: 'mailto:jorgeb.dev.acc@gmail.com', label: 'Email' },
]

function validate(): boolean {
  serverError.value = ''
  if (!form.name || !form.email || !form.message) {
    serverError.value = t('contact.formErrorRequired')
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    serverError.value = t('contact.formErrorEmail')
    return false
  }
  return true
}

async function handleSubmit() {
  if (!validate()) return
  isSubmitting.value = true
  serverError.value = ''

  try {
    const res = await $fetch('/api/contact', { method: 'POST', body: { name: form.name, email: form.email, message: form.message } })
    if (res.success) {
      isSuccess.value = true
    }
  } catch {
    serverError.value = t('contact.formError')
  } finally {
    isSubmitting.value = false
  }
}

function onFieldFocus(e: FocusEvent) {
  const field = (e.currentTarget as HTMLElement).closest('.field-group') as HTMLElement
  if (!field) return
  const line = field.querySelector('.field-accent-line') as HTMLElement
  if (line) gsap.to(line, { scaleX: 1, duration: 0.35, ease: 'power2.out' })
}

function onFieldBlur(e: FocusEvent) {
  const input = e.currentTarget as HTMLInputElement | HTMLTextAreaElement
  const field = input.closest('.field-group') as HTMLElement
  if (!field) return
  if (!input.value) {
    const line = field.querySelector('.field-accent-line') as HTMLElement
    if (line) gsap.to(line, { scaleX: 0, duration: 0.3, ease: 'power2.in' })
  }
}

onMounted(() => {
  if (socialSectionRef.value) {
    socialCtx = gsap.context(() => {
      gsap.set('.social-label, .social-title, .social-text', { opacity: 0 })
      gsap.set('.social-item', { opacity: 0, scale: 0.92 })

      gsap.timeline({
        scrollTrigger: {
          trigger: socialSectionRef.value,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        }
      })
        .to('.social-label', { opacity: 1, duration: 0.35, ease: 'power2.out' })
        .to('.social-title', { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
        .to('.social-text', { opacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.15')
        .to('.social-item', {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.06,
          ease: 'power2.out'
        }, '-=0.15')
    }, socialSectionRef.value)
  }

  if (formSectionRef.value) {
    formCtx = gsap.context(() => {
      gsap.set('.form-label, .form-title, .field-group, .submit-btn', { opacity: 0, y: 30 })

      gsap.timeline({
        scrollTrigger: {
          trigger: formSectionRef.value,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        }
      })
        .to('.form-label', { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
        .to('.form-title', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.15')
        .to('.field-group', { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' }, '-=0.2')
        .to('.submit-btn', { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, '-=0.15')
    }, formSectionRef.value)
  }

  ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: socialSectionRef.value,
        start: 'top top',
        end: () => `+=${socialSectionRef.value?.offsetHeight || window.innerHeight}`,
        scrub: 1,
      }
    }).to('.social-content', { yPercent: -10, opacity: 0.5, ease: 'none' }, 0)
  })

  requestAnimationFrame(() => ScrollTrigger.refresh(true))
  setTimeout(() => ScrollTrigger.refresh(true), 150)
})

onUnmounted(() => {
  ctx?.revert()
  socialCtx?.revert()
  formCtx?.revert()
})
</script>

<template>
  <div class="contact-page">
    <section ref="socialSectionRef" class="section section--social">
      <div class="container">
        <div class="social-content">
          <span class="section-label social-label">{{ t('contact.socialLabel') }}</span>
          <h2 class="section-title social-title">{{ t('contact.socialTitle') }}</h2>
          <p class="section-text social-text">{{ t('contact.socialText') }}</p>

          <div class="social-grid">
            <a
              v-for="s in socials"
              :key="s.key"
              :href="s.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-item"
              :aria-label="s.label"
            >
              <span class="social-icon"><i :class="'pi ' + s.icon"></i></span>
              <span class="social-name">{{ s.label }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true">
      <span class="divider-line" />
      <span class="divider-dot" />
      <span class="divider-line" />
    </div>

    <section ref="formSectionRef" class="section section--form">
      <div class="container">
        <div class="form-content">
          <span class="section-label form-label">{{ t('contact.formLabel') }}</span>
          <h2 class="section-title form-title">{{ t('contact.formTitle') }}</h2>

          <Transition name="form-swap" mode="out-in">
            <div v-if="!isSuccess" key="form" class="form-wrapper">
              <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
                <div class="field-group">
                  <input
                    id="field-name"
                    v-model="form.name"
                    type="text"
                    class="field-input"
                    placeholder=" "
                    required
                    autocomplete="name"
                    @focus="onFieldFocus"
                    @blur="onFieldBlur"
                  />
                  <label for="field-name" class="field-label">{{ t('contact.formName') }}</label>
                  <div class="field-base-line" />
                  <div class="field-accent-line" />
                </div>

                <div class="field-group">
                  <input
                    id="field-email"
                    v-model="form.email"
                    type="email"
                    class="field-input"
                    placeholder=" "
                    required
                    autocomplete="email"
                    @focus="onFieldFocus"
                    @blur="onFieldBlur"
                  />
                  <label for="field-email" class="field-label">{{ t('contact.formEmail') }}</label>
                  <div class="field-base-line" />
                  <div class="field-accent-line" />
                </div>

                <div class="field-group">
                  <textarea
                    id="field-message"
                    v-model="form.message"
                    class="field-input field-textarea"
                    placeholder=" "
                    required
                    rows="4"
                    @focus="onFieldFocus"
                    @blur="onFieldBlur"
                  />
                  <label for="field-message" class="field-label">{{ t('contact.formMessage') }}</label>
                  <div class="field-base-line" />
                  <div class="field-accent-line" />
                </div>

                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <span class="submit-label">{{ isSubmitting ? t('contact.formSending') : t('contact.formSubmit') }}</span>
                  <span v-if="isSubmitting" class="submit-icon"><i class="pi pi-spinner-dotted pi-spin"></i></span>
                  <span v-else class="submit-icon"><i class="pi pi-arrow-right"></i></span>
                </button>
              </form>

              <p v-if="serverError" class="form-error">{{ serverError }}</p>
            </div>

            <div v-else key="success" class="success-message">
              <span class="success-icon"><i class="pi pi-check-circle"></i></span>
              <p class="success-text">{{ t('contact.formSuccess') }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  padding-top: 70px;
}

.section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: var(--space-4xl) 0;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  width: 100%;
  position: relative;
  z-index: 1;
}

/* Divider */
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: 0 var(--container-padding);
}

.divider-line {
  display: block;
  width: min(120px, 20vw);
  height: 1px;
  background: var(--color-gray-600);
}

.divider-dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0.5;
}

.social-content {
  max-width: 680px;
  margin: 0 auto;
}

.form-content {
  max-width: 540px;
  margin: 0 auto;
}

.section-label {
  display: inline-block;
  font-size: var(--text-small);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
  position: relative;
}

.section-label::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 20px;
  height: 1px;
  background: var(--color-accent);
  opacity: 0.4;
}

.section-title {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--font-bold);
  line-height: 1.2;
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.section-text {
  font-size: var(--text-body-lg);
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3xl);
}

/* Social Grid */
.social-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.social-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-lg);
  text-decoration: none;
  color: var(--color-text-muted);
  padding: var(--space-sm) 0;
  transition: color 0.3s var(--ease-default), transform 0.3s var(--ease-default);
}

.social-item:hover {
  color: var(--color-accent);
  transform: translateX(4px);
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-gray-600);
  border-radius: var(--radius-md);
  transition: border-color 0.3s var(--ease-default), background 0.3s var(--ease-default);
  font-size: 1.1rem;
}

.social-item:hover .social-icon {
  border-color: var(--color-accent);
  background: var(--color-accent-light);
}

.social-name {
  font-size: var(--text-small);
  font-weight: var(--font-medium);
  color: var(--color-text-secondary);
}

/* Form */
.form-wrapper {
  position: relative;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.field-group {
  position: relative;
  padding-top: var(--space-lg);
}

.field-input {
  width: 100%;
  padding: var(--space-sm) 0;
  background: none;
  border: none;
  outline: none;
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  caret-color: var(--color-accent);
  resize: none;
}

.field-textarea {
  min-height: 80px;
}

.field-label {
  position: absolute;
  left: 0;
  top: calc(var(--space-lg) + var(--space-sm));
  font-size: var(--text-body);
  color: var(--color-text-muted);
  pointer-events: none;
  transition: all 0.3s var(--ease-elegant);
}

.field-input:focus ~ .field-label,
.field-input:not(:placeholder-shown) ~ .field-label {
  top: 0;
  font-size: var(--text-tiny);
  color: var(--color-accent);
}

.field-base-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-gray-600);
}

.field-accent-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: center;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) 0 2px;
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--font-medium);
  color: var(--color-accent);
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  align-self: flex-start;
  transition: color var(--duration-normal) var(--ease-default);
}

.submit-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 0.4s var(--ease-elegant);
}

.submit-btn:hover::after {
  transform: scaleX(0);
  transform-origin: right;
}

.submit-btn:hover .submit-label {
  transform: translateX(-4px);
}

.submit-btn:hover .submit-icon {
  transform: translateX(6px);
}

.submit-btn:disabled {
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.submit-btn:disabled::after {
  background: var(--color-text-muted);
}

.submit-btn:disabled:hover::after {
  transform: scaleX(1);
}

.submit-btn:disabled .submit-label,
.submit-btn:disabled .submit-icon {
  transform: none;
}

.submit-label {
  transition: transform 0.4s var(--ease-elegant);
}

.submit-icon {
  display: inline-flex;
  align-items: center;
}

.form-error {
  margin-top: var(--space-lg);
  font-size: var(--text-small);
  color: var(--color-accent);
  text-align: center;
}

/* Success */
.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-3xl) 0;
}

.success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: var(--color-accent-light);
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
  font-size: 1.5rem;
}

.success-text {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* Vue transition */
.form-swap-enter-active,
.form-swap-leave-active {
  transition: all 0.4s var(--ease-elegant);
}

.form-swap-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.form-swap-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive */
@media (max-width: 1024px) {
  .section-title {
    font-size: clamp(1.5rem, 4vw, var(--text-h1));
  }

  .section-text {
    font-size: clamp(0.875rem, 2.5vw, var(--text-body-lg));
  }
}

@media (max-width: 768px) {
  .section {
    padding: var(--space-3xl) 0;
  }

  .section-title {
    font-size: var(--text-h2);
  }

  .section-text {
    font-size: var(--text-body);
    margin-bottom: var(--space-2xl);
  }

  .social-grid {
    gap: var(--space-sm);
  }

  .social-icon {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .social-name {
    font-size: var(--text-body);
  }

  .contact-form {
    gap: var(--space-lg);
  }

  .submit-btn {
    font-size: var(--text-small);
  }

  .success-message {
    padding: var(--space-2xl) 0;
  }

  .success-icon {
    width: 48px;
    height: 48px;
  }

  .success-text {
    font-size: var(--text-body);
  }
}

@media (max-width: 480px) {
  .section {
    padding: var(--space-2xl) 0;
  }

  .section-title {
    font-size: var(--text-h3);
    margin-bottom: var(--space-md);
  }

  .section-text {
    margin-bottom: var(--space-xl);
  }

  .social-item {
    gap: var(--space-md);
    padding: var(--space-xs) 0;
  }

  .social-icon {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }

  .social-name {
    font-size: var(--text-small);
  }

  .section-label {
    font-size: var(--text-tiny);
    margin-bottom: var(--space-md);
  }

  .contact-form {
    gap: var(--space-md);
  }

  .field-group {
    padding-top: var(--space-md);
  }

  .field-input {
    font-size: 16px;
  }

  .field-label {
    font-size: var(--text-small);
  }

  .field-input:focus ~ .field-label,
  .field-input:not(:placeholder-shown) ~ .field-label {
    font-size: 0.625rem;
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
  }

  .success-message {
    padding: var(--space-xl) 0;
  }

  .success-icon {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }

  .divider-line {
    width: 15vw;
  }
}

@media (max-width: 360px) {
  .section {
    padding: var(--space-xl) 0;
  }

  .social-name {
    display: none;
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .section {
    padding: var(--space-2xl) 0;
  }

  .section-text {
    margin-bottom: var(--space-xl);
  }

  .social-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
  }

  .social-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-sm);
    padding: var(--space-sm);
    border: 1px solid var(--color-gray-600);
    border-radius: var(--radius-md);
    transition: border-color 0.3s var(--ease-default);
  }

  .social-item:hover {
    border-color: var(--color-accent);
    transform: none;
  }

  .social-name {
    display: block;
  }

  .contact-form {
    gap: var(--space-md);
  }
}
</style>
