<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import catDesktop from '~/assets/img/kpi-cat-desktop.webp'
import catDesktopSmall from '~/assets/img/kpi-cat-desktop-small.webp'
import catMobile from '~/assets/img/kpi-cat-mobile.webp'
gsap.registerPlugin(ScrollTrigger, SplitText)

const sectionRef = ref<HTMLElement | null>(null)
const phraseEl = ref<HTMLElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)
const orbRef = ref<HTMLElement | null>(null)
const orbCorner1Ref = ref<HTMLElement | null>(null)
const orbCorner2Ref = ref<HTMLElement | null>(null)
const specialCardRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const displayValues = ref([0, 0, 0])

interface Counter {
  current: number
}

const metrics = [
  { value: 98, suffix: '+', label: 'Lighthouse Score', index: 0, icon: 'shield' },
  { value: 4, suffix: '', label: 'Production Clients', index: 1, icon: 'briefcase' },
  { value: 3, suffix: '+', label: 'Years Shipping', index: 2, icon: 'calendar' },
]

const phrases = [
  'Measurable results from every project.',
  'AI-accelerated delivery with custom tooling.',
  'Agent-based automation and MCP servers.',
  'Production-grade quality on every ship.',
]

const currentIndex = ref(0)
let cycleTimer: ReturnType<typeof setTimeout> | null = null
let hasCycleStarted = false

function onMouseMove(e: MouseEvent) {
  if (!specialCardRef.value || !orbRef.value) return

  const cardRect = specialCardRef.value.getBoundingClientRect()
  const cx = cardRect.left + cardRect.width / 2
  const cy = cardRect.top + cardRect.height / 2

  const dx = e.clientX - cx
  const dy = e.clientY - cy
  const dist = Math.sqrt(dx * dx + dy * dy)

  const maxDist = Math.min(window.innerWidth, window.innerHeight) * 0.6
  let progress = gsap.utils.clamp(0, 1, 1 - dist / maxDist)
  progress = progress * progress

  gsap.to(orbRef.value, {
    scale: 0.7 + progress * 1.3,
    opacity: 0.7 + progress * 0.3,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto',
  })

  gsap.to([orbCorner1Ref.value, orbCorner2Ref.value], {
    scale: 0.5 + progress * 1.0,
    opacity: 0.3 + progress * 0.5,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto',
  })
}

function onMouseLeave() {
  gsap.to(orbRef.value, {
    scale: 0.7,
    opacity: 0.7,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto',
  })

  gsap.to([orbCorner1Ref.value, orbCorner2Ref.value], {
    scale: 0.5,
    opacity: 0.3,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto',
  })
}

function startProgressBar() {
  if (progressBar.value) {
    gsap.set(progressBar.value, { scaleX: 0 })
    gsap.to(progressBar.value, {
      scaleX: 1,
      duration: 4,
      ease: 'none',
    })
  }
}

function scheduleCycle() {
  cycleTimer = setTimeout(() => cycleForward(), 4000)
}

function cycleForward() {
  if (progressBar.value) {
    gsap.killTweensOf(progressBar.value)
    gsap.to(progressBar.value, {
      scaleX: 0,
      duration: 0.4,
      ease: 'power2.in',
    })
  }
  gsap.to(phraseEl.value, {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: () => {
      currentIndex.value = (currentIndex.value + 1) % phrases.length
      nextTick(() => {
        startProgressBar()
        gsap.fromTo(phraseEl.value,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'power2.out', onComplete: () => scheduleCycle() }
        )
      })
    }
  })
}

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.set('.kpi-orb', { scale: 0.7, opacity: 0.7 })
    gsap.set('.kpi-orb-corner--left', { xPercent: -50, yPercent: 50, scale: 0.5, opacity: 0.3 })
    gsap.set('.kpi-orb-corner--right', { xPercent: 50, yPercent: 50, scale: 0.5, opacity: 0.3 })
    gsap.set('.phrase-progress', { scaleX: 0 })

    const titleSplit = SplitText.create('.kpi-title', {
      type: 'chars',
      charsClass: 'title-char'
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    })

    tl.from('.kpi-header .section-label', {
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

    tl.from('.kpi-cat', {
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, 0.6)

    tl.from('.kpi-grid', {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, 0.6)

    tl.from('.kpi-card:not(.kpi-card--special)', {
      opacity: 0,
      stagger: { each: 0.08, from: 'start', ease: 'power2.out', amount: 0.35 },
      duration: 0.45,
      ease: 'power3.out',
    }, 0.85)

    tl.from('.kpi-card--special', {
      opacity: 0,
      duration: 0.45,
      ease: 'power3.out',
    }, 1.09)

    tl.from('.kpi-phrase', {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, 1.2)

    tl.call(() => {
      if (!hasCycleStarted) {
        hasCycleStarted = true
        startProgressBar()
        scheduleCycle()
      }
    }, [], 1.9)

    const counters: Counter[] = metrics.map(() => ({ current: 0 }))

    counters.forEach((counter, i) => {
      tl.to(counter, {
        current: metrics[i].value,
        duration: 1.8,
        ease: 'none',
        onUpdate: () => {
          displayValues.value[i] = Math.round(counter.current)
        }
      }, 0.85)
    })

    tl.to('.kpi-value', {
      scale: 1.06,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      stagger: 0.04,
      ease: 'power1.inOut',
    }, '>-0.1')

    gsap.to('.kpi-accent-dot', {
      opacity: 0.15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to([orbCorner1Ref.value, orbCorner2Ref.value], {
      y: '+=6',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })


  }, sectionRef.value)

  sectionRef.value?.addEventListener('mousemove', onMouseMove)
  sectionRef.value?.addEventListener('mouseleave', onMouseLeave)
})

onUnmounted(() => {
  ctx?.revert()
  if (cycleTimer) clearTimeout(cycleTimer)
  sectionRef.value?.removeEventListener('mousemove', onMouseMove)
  sectionRef.value?.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<template>
  <section ref="sectionRef" class="kpi-section">
    <div class="kpi-orb-wrap">
      <div ref="orbRef" class="kpi-orb" />
    </div>
    <svg class="kpi-noise" viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true">
      <filter id="kpiNoiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="3.2" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#kpiNoiseFilter)" opacity="0.02" />
    </svg>
    <div class="container">
      <div class="kpi-main">
        <div class="kpi-left">
          <div class="kpi-header">
            <span class="section-label">Impact in Numbers</span>
            <h2 class="kpi-title">
              Code that ships.<br />Products that perform.
            </h2>
          </div>

          <div class="kpi-grid">
            <div
              v-for="metric in metrics"
              :key="metric.label"
              class="kpi-card"
            >
              <div class="kpi-value-wrap">
                <svg class="kpi-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <template v-if="metric.icon === 'shield'">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </template>
                  <template v-else-if="metric.icon === 'briefcase'">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </template>
                  <template v-else-if="metric.icon === 'calendar'">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </template>
                </svg>
                <span class="kpi-value">
                  {{ displayValues[metric.index] }}{{ metric.suffix }}
                </span>
              </div>
              <span class="kpi-label">{{ metric.label }}</span>
            </div>

            <div ref="specialCardRef" class="kpi-card kpi-card--special">
              <div class="kpi-card-body">
                <span class="kpi-value kpi-value--accent">AI-Driven</span>
                <span class="kpi-accent-dot" />
                <span class="kpi-label">Development Accelerated</span>
              </div>
            </div>
          </div>

          <div class="kpi-phrases">
            <p ref="phraseEl" class="kpi-phrase" v-text="phrases[currentIndex]"></p>
            <span ref="progressBar" class="phrase-progress" aria-hidden="true" />
          </div>
        </div>

        <div class="kpi-right">
          <picture class="kpi-cat">
            <source :srcset="catDesktop" media="(min-width: 1200px)" />
            <source :srcset="catDesktopSmall" media="(min-width: 768px)" />
            <img :src="catMobile" alt="" width="400" height="400" aria-hidden="true" />
          </picture>
        </div>
      </div>
    </div>

    <div ref="orbCorner1Ref" class="kpi-orb-corner kpi-orb-corner--left" />
    <div ref="orbCorner2Ref" class="kpi-orb-corner kpi-orb-corner--right" />
  </section>
</template>

<style scoped>
.kpi-section {
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

.kpi-noise {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: overlay;
  z-index: 0;
}

.kpi-orb-wrap {
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 0;
}

.kpi-orb {
  width: min(600px, 80vw);
  height: min(600px, 80vw);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(185, 28, 60, 0.15) 0%,
    transparent 70%
  );
  transform-origin: center center;
}

.kpi-orb-corner {
  position: absolute;
  width: min(900px, 100vw);
  height: min(900px, 100vw);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transform-origin: center center;
  background: radial-gradient(
    circle,
    rgba(185, 28, 60, 0.15) 0%,
    transparent 70%
  );
}

.kpi-orb-corner--left {
  left: 0;
  bottom: 0;
}

.kpi-orb-corner--right {
  right: 0;
  bottom: 0;
}

.kpi-header {
  margin-bottom: var(--space-2xl);
}

.kpi-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: center;
  margin-bottom: var(--space-2xl);
}

.kpi-left {
  min-width: 0;
}

.kpi-right {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.kpi-cat {
  width: 100%;
  height: auto;
  opacity: 0.85;
  mask-image:
    linear-gradient(to right, black 60%, transparent 100%),
    linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image:
    linear-gradient(to right, black 60%, transparent 100%),
    linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

.kpi-cat img {
  display: block;
  width: 100%;
  height: auto;
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
  bottom: -6px;
  left: 0;
  width: 24px;
  height: 1px;
  background: var(--color-accent);
  opacity: 0.4;
}

.kpi-title {
  font-family: var(--font-heading);
  font-size: var(--text-display);
  font-weight: var(--font-semibold);
  line-height: 1.25;
  color: var(--color-text-primary);
  margin: 0;
}

:deep(.title-char) {
  display: inline-block;
}

.kpi-grid {
  position: relative;
  display: flex;
  margin-bottom: var(--space-2xl);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(39, 39, 42, 0.35);
  background: rgba(28, 28, 31, 0.04);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transform-origin: center center;
}

.kpi-grid::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -25%;
  width: 60%;
  height: 100%;
  background: radial-gradient(ellipse at top right, rgba(185, 28, 60, 0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.kpi-card {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: var(--space-xl) var(--space-md);
  background: rgba(20, 20, 22, 0.2);
  text-align: center;
  transition: background var(--duration-normal) var(--ease-default);
  transform-origin: center center;
  border-right: 1px solid rgba(39, 39, 42, 0.3);
}

.kpi-card:not(.kpi-card--special)::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  width: 0;
  height: 1px;
  background: var(--color-accent);
  opacity: 0;
  transition:
    width var(--duration-slower) var(--ease-elegant),
    opacity var(--duration-slower) var(--ease-elegant);
  transform: translateX(-50%);
}

.kpi-card:not(.kpi-card--special):hover::before {
  width: 60%;
  opacity: 0.6;
}

.kpi-card:last-child {
  border-right: none;
}

.kpi-card:hover {
  background: rgba(28, 28, 31, 0.7);
}

.kpi-card--special {
  background: linear-gradient(
    180deg,
    rgba(185, 28, 60, 0.12) 0%,
    rgba(185, 28, 60, 0.04) 100%
  );
  position: relative;
}

/* Hover gradient overlay — smooth crossfade */
.kpi-card--special::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(185, 28, 60, 0.22) 0%,
    rgba(185, 28, 60, 0.1) 100%
  );
  opacity: 0;
  transition: opacity var(--duration-slower) var(--ease-elegant);
  pointer-events: none;
}

.kpi-card--special:hover::after {
  opacity: 1;
}

/* Accent bar centered on the left border divider */
.kpi-card--special::before {
  content: '';
  position: absolute;
  top: 25%;
  left: -1px;
  width: 2px;
  height: 50%;
  background: var(--color-accent);
  opacity: 0.45;
  border-radius: 2px;
  transition:
    height var(--duration-slower) var(--ease-elegant),
    top var(--duration-slower) var(--ease-elegant),
    opacity var(--duration-slower) var(--ease-elegant);
  z-index: 1;
}

.kpi-card--special:hover::before {
  top: 0;
  height: 100%;
  opacity: 0.8;
}

.kpi-card-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

.kpi-value {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.kpi-value--accent {
  font-size: var(--text-h3);
  color: var(--color-accent);
  position: relative;
}

.kpi-accent-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0.35;
}

.kpi-value-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.kpi-icon {
  flex-shrink: 0;
  color: var(--color-accent);
  opacity: 0.85;
}

.kpi-label {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.kpi-phrases {
  position: relative;
  max-width: 600px;
  margin-right: auto;
  margin-left: 0;
  height: 1.7em;
}

.phrase-progress {
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  opacity: 0.35;
}

.kpi-phrase {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0;
  text-align: left;
  font-size: var(--text-body-lg);
  line-height: 1.7;
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .kpi-section {
    padding: var(--space-3xl) 0;
  }

  .kpi-main {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .kpi-cat {
    max-width: 260px;
    margin: 0 auto;
    opacity: 0.7;
  }

  .kpi-grid {
    flex-wrap: wrap;
  }

  .kpi-card {
    flex: 0 0 50%;
    padding: var(--space-lg) var(--space-sm);
  }

  .kpi-card:nth-child(2) {
    border-right: none;
  }

  .kpi-card:last-child {
    flex: 0 0 100%;
    border-right: none;
  }

  .kpi-title {
    font-size: var(--text-h1);
  }

  .kpi-value {
    font-size: var(--text-h3);
  }

  .kpi-value--accent {
    font-size: var(--text-body-lg);
  }
}

@media (max-width: 480px) {
  .kpi-card {
    flex: 0 0 100%;
  }

  .kpi-cat {
    display: none;
  }
}

@media (min-width: 1440px) {
  .kpi-section .container {
    max-width: 1400px;
  }

  .kpi-card {
    gap: var(--space-sm);
    padding: var(--space-lg) var(--space-lg);
  }

  .kpi-value {
    font-size: var(--text-h1);
  }

  .kpi-value--accent {
    font-size: var(--text-h2);
  }

  .kpi-value-wrap {
    gap: var(--space-sm);
  }

  .kpi-icon {
    width: 24px;
    height: 24px;
  }

  .kpi-label {
    font-size: var(--text-small);
  }
}
</style>
