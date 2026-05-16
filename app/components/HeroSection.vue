<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.hero-eyebrow', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    })
    .from('.hero-title-line', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15
    }, '-=0.5')
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.6')
    .from('.hero-cta', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')

    gsap.to('.hero-bg', {
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 100,
      opacity: 0.3
    })
  }, heroRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="heroRef" class="hero">
    <div class="hero-bg"></div>
    <div class="container">
      <div ref="contentRef" class="hero-content">
        <span class="hero-eyebrow">Fullstack Developer</span>
        
        <h1 class="hero-title">
          <span class="hero-title-line">Building digital</span>
          <span class="hero-title-line">experiences that</span>
          <span class="hero-title-line">matter<span class="accent">.</span></span>
        </h1>
        
        <p class="hero-subtitle">
          I craft elegant solutions with React, TypeScript and Vue. 
          Transforming complex challenges into seamless, performant applications.
        </p>
        
        <div class="hero-cta">
          <NuxtLink to="/contact" class="cta-button">
            <span>Let's work together</span>
            <svg class="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 50% 0%, var(--color-accent-muted) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  width: 100%;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-eyebrow {
  display: inline-block;
  font-size: var(--text-small);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
}

.hero-title {
  font-family: var(--font-heading);
  font-size: var(--text-display);
  font-weight: var(--font-bold);
  line-height: 1.1;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
}

.hero-title-line {
  display: block;
}

.hero-title-line .accent {
  color: var(--color-accent);
}

.hero-subtitle {
  font-size: var(--text-body-lg);
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--space-2xl);
}

.hero-cta {
  display: flex;
  justify-content: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-xl);
  background: var(--color-accent);
  color: var(--color-gray-950);
  font-size: var(--text-body);
  font-weight: var(--font-semibold);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--duration-normal) var(--ease-default);
}

.cta-button:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
}

.cta-button .arrow {
  transition: transform var(--duration-fast) var(--ease-default);
}

.cta-button:hover .arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .hero-subtitle {
    font-size: var(--text-body);
  }
  
  .cta-button {
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--text-small);
  }
}
</style>