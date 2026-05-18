<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const smootherState = useState('smoother', () => 'pending')
let smoother: ReturnType<typeof ScrollSmoother.create> | null = null

onMounted(async () => {
  const isDesktop = window.innerWidth >= 768
  const noReducedMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (isDesktop && noReducedMotion) {
    const { ScrollSmoother } = await import('gsap/ScrollSmoother')
    gsap.registerPlugin(ScrollSmoother)

    smoother = ScrollSmoother.create({
      smooth: 1,
      normalizeScroll: true
    })

    smootherState.value = 'ready'
  } else {
    smootherState.value = 'none'
  }
})

onUnmounted(() => {
  smoother?.kill()
})
</script>

<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <CustomCursor />
    <NavBar />

    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main class="main-content">
          <NuxtPage />
        </main>
        <Footer />
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#smooth-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

#smooth-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* Hide scrollbar globally */
html {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  display: none;
}

#smooth-wrapper {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#smooth-wrapper::-webkit-scrollbar {
  display: none;
}

body {
  overflow: -moz-scrollbars-none;
}
</style>
