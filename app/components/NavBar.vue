<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const { locale, setLocale } = useI18n()

const isVisible = ref(true)
const isScrolled = ref(false)
const hideTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const toggleLocale = () => {
  setLocale(locale.value === 'en' ? 'es' : 'en')
}

const showNav = () => {
  if (!isVisible.value) {
    isVisible.value = true
    gsap.to('.navbar', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    })
  }
  resetHideTimer()
}

const hideNav = () => {
  if (isVisible.value) {
    isVisible.value = false
    gsap.to('.navbar', {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in'
    })
  }
}

const resetHideTimer = () => {
  if (hideTimeout.value) clearTimeout(hideTimeout.value)
  hideTimeout.value = setTimeout(hideNav, 3000)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.set('.navbar', { opacity: 1, y: 0 })
  })
  resetHideTimer()
  window.addEventListener('mousemove', showNav)
  window.addEventListener('keydown', showNav)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (hideTimeout.value) clearTimeout(hideTimeout.value)
  window.removeEventListener('mousemove', showNav)
  window.removeEventListener('keydown', showNav)
  window.removeEventListener('scroll', handleScroll)
  ctx?.revert()
})
</script>

<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-inner">
      <NuxtLink to="/" class="logo">JB</NuxtLink>

      <nav class="nav-links">
        <NuxtLink to="/" class="nav-link">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">{{ $t('nav.contact') }}</NuxtLink>
      </nav>

      <div class="lang-switcher">
        <button
          class="lang-btn"
          :class="{ active: locale === 'en' }"
          @click="setLocale('en')"
        >EN</button>
        <span class="lang-divider">|</span>
        <button
          class="lang-btn"
          :class="{ active: locale === 'es' }"
          @click="setLocale('es')"
        >ES</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: var(--space-md) var(--container-padding);
  background: transparent;
  transition: background-color var(--duration-normal) var(--ease-default);
}

.navbar.scrolled {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-gray-700);
}

.navbar-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: var(--space-xl);
}

.nav-link {
  font-size: var(--text-small);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-default);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-accent);
}

.lang-switcher {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.lang-btn {
  background: none;
  border: none;
  font-size: var(--text-tiny);
  font-weight: var(--font-medium);
  color: var(--color-text-muted);
  cursor: pointer;
  padding: var(--space-xs);
  transition: color var(--duration-fast) var(--ease-default);
}

.lang-btn:hover,
.lang-btn.active {
  color: var(--color-accent);
}

.lang-divider {
  color: var(--color-text-muted);
  font-size: var(--text-tiny);
}

@media (max-width: 768px) {
  .nav-links {
    gap: var(--space-md);
  }

  .nav-link {
    font-size: var(--text-tiny);
  }
}
</style>