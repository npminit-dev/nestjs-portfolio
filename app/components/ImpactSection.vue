<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import impactCatDesktop from '~/assets/img/impact-cat-desktop.webp'
import impactCatDesktopSmall from '~/assets/img/impact-cat-desktop-small.webp'

gsap.registerPlugin(ScrollTrigger, SplitText)

const sectionRef = ref<HTMLElement | null>(null)
const orbRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

interface Project {
  id: string
  name: string
  description: string
  outcome: string
}

const projects: Project[] = [
  {
    id: '01',
    name: 'From zero to shipped',
    description: 'Every project starts as a blank page. Every project ships.',
    outcome: 'Ideas in production',
  },
  {
    id: '02',
    name: 'First principles',
    description: 'Strong foundations in algorithms, design, and systems thinking.',
    outcome: 'No framework dependency',
  },
  {
    id: '03',
    name: 'The 80/20 edge',
    description: 'Maximum value, minimum friction — ruthlessly prioritized.',
    outcome: 'Impact per unit effort',
  },
]

onMounted(() => {
  if (!sectionRef.value) return

  ctx = gsap.context(() => {
    gsap.set('.impact-orb', { scale: 0.6, opacity: 0.4 })
    gsap.set('.impact-timeline', { scaleY: 0, transformOrigin: 'top center' })
    gsap.set('.impact-item', { opacity: 0, clipPath: 'inset(0 100% 0 0)' })
    gsap.set('.impact-item-dot', { scale: 0 })
    gsap.set('.impact-item-outcome-bar', { width: 0 })

    const titleSplit = SplitText.create('.impact-title', {
      type: 'chars',
      charsClass: 'impact-title-char'
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    })

    tl.from('.impact-label', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 0.2)

    tl.from(titleSplit.chars, {
      autoAlpha: 0,
      duration: 0.35,
      stagger: 0.02,
      ease: 'power2.out',
    }, 0.4)

    tl.to('.impact-orb', {
      scale: 1,
      opacity: 0.6,
      duration: 1.2,
      ease: 'power3.out',
    }, 0.3)

    tl.to('.impact-timeline', {
      scaleY: 1,
      duration: 0.8,
      ease: 'power3.inOut',
    }, 0.6)

    tl.to('.impact-item', {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.6,
      stagger: 0.2,
      ease: 'power3.out',
    }, 0.7)

    tl.to('.impact-item-dot', {
      scale: 1,
      duration: 0.3,
      stagger: 0.2,
      ease: 'back.out(1.7)',
    }, '>-0.3')

    tl.to('.impact-item-outcome-bar', {
      width: '2px',
      duration: 0.4,
      stagger: 0.15,
      ease: 'power2.out',
    }, '>-0.1')

    gsap.to('.impact-orb', {
      y: '+=8',
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      titleSplit.revert()
    }
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="impact-section">
    <div ref="orbRef" class="impact-orb-wrap" aria-hidden="true">
      <div class="impact-orb" />
    </div>

    <svg class="impact-noise" viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true">
      <filter id="impactNoiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="2.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#impactNoiseFilter)" opacity="0.015" />
    </svg>

    <div class="container">
      <div class="impact-grid">
        <div class="impact-left">
          <header class="impact-header">
            <span class="impact-label">Operating Principles</span>
            <h2 class="impact-title">
              Ideas that guide the work
            </h2>
          </header>

          <div class="impact-list">
            <div class="impact-timeline" aria-hidden="true" />
            <article
              v-for="project in projects"
              :key="project.id"
              class="impact-item"
            >
              <span class="impact-item-bg-num" aria-hidden="true">{{ project.id }}</span>
              <div class="impact-item-left">
                <span class="impact-item-dot" />
              </div>
              <div class="impact-item-body">
                <h3 class="impact-item-title">{{ project.name }}</h3>
                <p class="impact-item-desc">{{ project.description }}</p>
                <div class="impact-item-outcome-wrap">
                  <span class="impact-item-outcome-bar" />
                  <span class="impact-item-outcome">{{ project.outcome }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="impact-right" aria-hidden="true">
          <picture class="impact-cat-wrap">
            <source media="(max-width: 768px)" :srcset="impactCatDesktopSmall">
            <img :src="impactCatDesktop" alt="" class="impact-cat">
          </picture>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.impact-section {
  position: relative;
  padding: var(--space-4xl) 0;
  background: var(--color-background);
  overflow: hidden;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  position: relative;
  z-index: 1;
}

.impact-noise {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: overlay;
  z-index: 0;
}

.impact-orb-wrap {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
}

.impact-orb {
  width: min(700px, 80vw);
  height: min(700px, 80vw);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(185, 28, 60, 0.12) 0%,
    transparent 65%
  );
  transform-origin: center center;
}

.impact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: start;
}

.impact-left {
  min-width: 0;
}

.impact-right {
  min-width: 0;
  display: flex;
  align-items: center;
  height: 100%;
}

.impact-cat-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.impact-cat {
  display: block;
  max-width: 100%;
  max-height: 800px;
  width: auto;
  height: auto;
  border-radius: 20px;
  filter: brightness(0.9);
  transform: rotate(-20deg);
  -webkit-mask-image: linear-gradient(-20deg, transparent 0%, transparent 10%, black 50%);
  mask-image: linear-gradient(-20deg, transparent 0%, transparent 10%, black 50%);
}

.impact-header {
  margin-bottom: var(--space-2xl);
}

.impact-label {
  display: inline-block;
  font-size: var(--text-small);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
  position: relative;
}

.impact-label::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 24px;
  height: 1px;
  background: var(--color-accent);
  opacity: 0.4;
}

.impact-title {
  font-family: var(--font-heading);
  font-size: var(--text-display);
  font-weight: var(--font-semibold);
  line-height: 1.25;
  color: var(--color-text-primary);
  margin: 0;
}

:deep(.impact-title-char) {
  display: inline-block;
}

.impact-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.impact-timeline {
  position: absolute;
  top: 0;
  left: 19px;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(185, 28, 60, 0.06),
    rgba(185, 28, 60, 0.16) 50%,
    rgba(185, 28, 60, 0.06)
  );
  z-index: 0;
}

.impact-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: var(--space-md);
  align-items: start;
  padding: var(--space-lg);
  padding-left: var(--space-xl);
  border: 1px solid rgba(39, 39, 42, 0.2);
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    rgba(20, 20, 22, 0.12) 0%,
    rgba(20, 20, 22, 0.04) 100%
  );
  position: relative;
  overflow: hidden;
  transition:
    border-color 0.4s var(--ease-out),
    box-shadow 0.4s var(--ease-out);
}

.impact-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: var(--color-accent-hover);
  transform: scaleY(0);
  transform-origin: center center;
  transition: transform 0.4s var(--ease-out);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.impact-item:hover::before {
  transform: scaleY(1);
}

.impact-item:hover {
  border-color: rgba(185, 28, 60, 0.3);
  box-shadow:
    0 0 40px rgba(185, 28, 60, 0.1),
    0 0 80px rgba(185, 28, 60, 0.04);
}

.impact-item:hover .impact-item-bg-num {
  opacity: 0.15;
}

.impact-item-bg-num {
  position: absolute;
  top: -8px;
  right: 12px;
  font-family: var(--font-mono);
  font-size: 56px;
  font-weight: 700;
  color: var(--color-accent);
  opacity: 0.04;
  line-height: 1;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.4s var(--ease-out);
}

.impact-item-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding-top: 4px;
  position: relative;
  z-index: 1;
}

.impact-item-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #f5a5b5, var(--color-accent) 60%);
  box-shadow: 0 0 4px rgba(185, 28, 60, 0.8), 0 0 12px rgba(185, 28, 60, 0.35);
  flex-shrink: 0;
}

.impact-item-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  position: relative;
  z-index: 1;
}

.impact-item-title {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  line-height: 1.3;
  margin: 0;
}

.impact-item-desc {
  font-size: var(--text-small);
  line-height: 1.5;
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-sm);
  max-width: 500px;
}

.impact-item-outcome-wrap {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.impact-item-outcome-bar {
  display: block;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  opacity: 0.5;
  flex-shrink: 0;
  border-radius: 1px;
}

.impact-item-outcome {
  display: inline-block;
  font-size: var(--text-tiny);
  font-weight: var(--font-semibold);
  color: var(--color-accent);
  letter-spacing: 0.03em;
  width: fit-content;
}

@media (max-width: 768px) {
  .impact-section {
    padding: var(--space-3xl) 0;
  }

  .impact-grid {
    grid-template-columns: 1fr;
  }

  .impact-right {
    display: none;
  }

  .impact-title {
    font-size: var(--text-h1);
  }

  .impact-timeline {
    display: none;
  }

  .impact-item {
    grid-template-columns: 24px 1fr;
    gap: var(--space-sm);
    padding: var(--space-md);
    padding-left: var(--space-lg);
  }

  .impact-item-dot {
    width: 6px;
    height: 6px;
  }

  .impact-item-bg-num {
    font-size: 40px;
    right: 8px;
    opacity: 0.03;
  }

  .impact-item-title {
    font-size: var(--text-body-lg);
  }
}

@media (min-width: 1440px) {
  .impact-section .container {
    max-width: 1400px;
  }

  .impact-item {
    padding: var(--space-xl);
    padding-left: 40px;
  }

  .impact-item-title {
    font-size: var(--text-h2);
  }

  .impact-item-desc {
    font-size: var(--text-body);
  }

  .impact-item-bg-num {
    font-size: 64px;
  }
}
</style>
