<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const { locale, setLocale } = useI18n()

const isVisible = ref(true)
const isScrolled = ref(false)
const isMenuOpen = ref(false)
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
    isMenuOpen.value = false
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

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
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
      <NuxtLink to="/" class="logo" @click="closeMenu">JB</NuxtLink>

      <button
        class="hamburger"
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
        aria-label="Toggle navigation menu"
        :aria-expanded="isMenuOpen"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <nav class="nav-links" :class="{ open: isMenuOpen }">
        <NuxtLink to="/" class="nav-link" @click="closeMenu">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink to="/contact" class="nav-link" @click="closeMenu">{{ $t('nav.contact') }}</NuxtLink>

        <div class="lang-switcher-mobile">
          <button
            class="lang-btn"
            :class="{ active: locale === 'en' }"
            @click="setLocale('en'); closeMenu()"
          >EN</button>
          <span class="lang-divider">|</span>
          <button
            class="lang-btn"
            :class="{ active: locale === 'es' }"
            @click="setLocale('es'); closeMenu()"
          >ES</button>
        </div>
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

    <div v-if="isMenuOpen" class="mobile-overlay" @click="closeMenu" />
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
  font-size: var(--text-h2);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  text-decoration: none;
  letter-spacing: -0.02em;
  z-index: 1002;
  position: relative;
}

.nav-links {
  display: flex;
  align-items: center;
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

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1002;
  position: relative;
}

.hamburger-line {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  transition: transform 0.3s var(--ease-default), opacity 0.3s var(--ease-default);
}

.hamburger.active .hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger.active .hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.lang-switcher {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  z-index: 1002;
  position: relative;
}

.lang-switcher-mobile {
  display: none;
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

.mobile-overlay {
  display: none;
}

@media (max-width: 768px) {
  .navbar-inner {
    padding: 0;
  }

  .nav-links {
    gap: var(--space-md);
  }

  .nav-link {
    font-size: var(--text-tiny);
  }

  .logo {
    font-size: 1.25rem;
  }

  .lang-btn {
    font-size: 10px;
    padding: 2px 4px;
  }

  .lang-divider {
    font-size: 10px;
  }
}

@media (max-width: 640px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    width: 75%;
    max-width: 320px;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-2xl);
    background: var(--color-surface);
    border-left: 1px solid var(--color-gray-600);
    padding: var(--space-4xl) var(--space-xl);
    transform: translateX(100%);
    transition: transform 0.35s var(--ease-elegant);
    z-index: 1001;
  }

  .nav-links.open {
    transform: translateX(0);
  }

  .nav-link {
    font-size: var(--text-h3);
  }

  .lang-switcher {
    display: none;
  }

  .lang-switcher-mobile {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    margin-top: var(--space-lg);
  }

  .lang-switcher-mobile .lang-btn {
    font-size: var(--text-small);
    padding: var(--space-xs) var(--space-sm);
  }

  .lang-switcher-mobile .lang-divider {
    font-size: var(--text-small);
  }

  .mobile-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
  }
}
</style>
