<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const { locale, setLocale } = useI18n()

const isVisible = ref(true)
const isScrolled = ref(false)
const hideTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const showNav = () => {
  if (!isVisible.value) {
    isVisible.value = true
    gsap.to('.navbar', {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power3.out'
    })
  }
  resetHideTimer()
}

const hideNav = () => {
  if (isVisible.value) {
    isVisible.value = false
    gsap.to('.navbar', {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: 'power2.in'
    })
  }
}

const resetHideTimer = () => {
  if (hideTimeout.value) clearTimeout(hideTimeout.value)
  hideTimeout.value = setTimeout(hideNav, 3000)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.set('.navbar', { opacity: 1, y: 0 })
  })
  resetHideTimer()
  window.addEventListener('mousemove', showNav)
  window.addEventListener('keydown', showNav)
  window.addEventListener('scroll', handleScroll, { passive: true })
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
  transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled {
  background: var(--color-surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-gray-600);
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

.nav-link:hover {
  color: var(--color-accent);
}

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

.lang-btn:hover {
  color: var(--color-accent);
}

.lang-btn.active {
  color: var(--color-accent);
}

.lang-divider {
  color: var(--color-text-muted);
  font-size: var(--text-tiny);
}

@media (max-width: 768px) {
  .navbar-inner {
    padding: 0 var(--space-sm);
  }

  .nav-links {
    gap: var(--space-md);
  }

  .nav-link {
    font-size: var(--text-tiny);
  }

  .logo {
    font-size: var(--text-h4);
  }

  .lang-btn {
    font-size: 10px;
    padding: 2px 4px;
  }

  .lang-divider {
    font-size: 10px;
  }
}
</style>