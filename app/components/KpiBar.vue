<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const sectionRef = ref<HTMLElement | null>(null)
const phraseEl = ref<HTMLElement | null>(null)
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
  { value: 98, suffix: '+', label: 'Lighthouse Score', index: 0 },
  { value: 4, suffix: '', label: 'Production Clients', index: 1 },
  { value: 3, suffix: '+', label: 'Years Shipping', index: 2 },
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
    opacity: 0.5 + progress * 0.5,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto',
  })

  gsap.to([orbCorner1Ref.value, orbCorner2Ref.value], {
    scale: 0.5 + progress * 1.0,
    opacity: 0.15 + progress * 0.45,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto',
  })
}

function onMouseLeave() {
  gsap.to(orbRef.value, {
    scale: 0.7,
    opacity: 0.5,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto',
  })

  gsap.to([orbCorner1Ref.value, orbCorner2Ref.value], {
    scale: 0.5,
    opacity: 0.15,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto',
  })
}

function scheduleCycle() {
  cycleTimer = setTimeout(() => cycleForward(), 4000)
}

function cycleForward() {
  gsap.to(phraseEl.value, {
    y: -16,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      currentIndex.value = (currentIndex.value + 1) % phrases.length
      nextTick(() => {
        gsap.fromTo(phraseEl.value,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', onComplete: () => scheduleCycle() }
        )
      })
    }
  })
}

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.set('.kpi-orb', { scale: 0.7, opacity: 0.5 })
    gsap.set('.kpi-orb-corner--left', { xPercent: -50, yPercent: 50, scale: 0.5, opacity: 0.15 })
    gsap.set('.kpi-orb-corner--right', { xPercent: 50, yPercent: 50, scale: 0.5, opacity: 0.15 })

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

    tl.from('.kpi-grid', {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, 0.6)

    tl.from('.kpi-card:not(.kpi-card--special)', {
      opacity: 0,
      stagger: 0.08,
      duration: 0.45,
      ease: 'power3.out',
    }, 0.85)

    tl.from('.kpi-card--special', {
      opacity: 0,
      duration: 0.45,
      ease: 'power3.out',
    }, 1.09)

    tl.from('.kpi-phrase', {
      y: 16,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, 1.2)

    tl.call(() => {
      if (!hasCycleStarted) {
        hasCycleStarted = true
        scheduleCycle()
      }
    }, [], 1.9)

    const counters: Counter[] = metrics.map(() => ({ current: 0 }))

    counters.forEach((counter, i) => {
      tl.to(counter, {
        current: metrics[i].value,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          displayValues.value[i] = Math.round(counter.current)
        }
      }, 0.85)
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
    <div class="container">
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
          <span class="kpi-value">
            {{ displayValues[metric.index] }}{{ metric.suffix }}
          </span>
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
    rgba(185, 28, 60, 0.08) 0%,
    transparent 70%
  );
  transform-origin: center center;
}

.kpi-orb-corner {
  position: absolute;
  width: min(600px, 80vw);
  height: min(600px, 80vw);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transform-origin: center center;
  background: radial-gradient(
    circle,
    rgba(185, 28, 60, 0.08) 0%,
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
  margin-bottom: var(--space-3xl);
}

.section-label {
  display: inline-block;
  font-size: var(--text-tiny);
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
  font-size: var(--text-h1);
  font-weight: var(--font-semibold);
  line-height: 1.25;
  color: var(--color-text-primary);
  margin: 0;
}

:deep(.title-char) {
  display: inline-block;
}

.kpi-grid {
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

.kpi-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-2xl) var(--space-lg);
  background: rgba(20, 20, 22, 0.2);
  text-align: center;
  transition: background var(--duration-normal) var(--ease-default);
  transform-origin: center center;
  border-right: 1px solid rgba(39, 39, 42, 0.3);
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
  top: 10%;
  left: -1px;
  width: 2px;
  height: 80%;
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
  font-size: var(--text-display);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.kpi-value--accent {
  font-size: var(--text-h1);
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

.kpi-label {
  font-size: var(--text-small);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.kpi-phrases {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  height: 1.7em;
}

.kpi-phrase {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0;
  text-align: center;
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .kpi-section {
    padding: var(--space-3xl) 0;
  }

  .kpi-grid {
    flex-wrap: wrap;
  }

  .kpi-card {
    flex: 0 0 50%;
    padding: var(--space-xl) var(--space-md);
  }

  .kpi-card:nth-child(2) {
    border-right: none;
  }

  .kpi-card:last-child {
    flex: 0 0 100%;
    border-right: none;
  }

  .kpi-value {
    font-size: var(--text-h1);
  }

  .kpi-value--accent {
    font-size: var(--text-h2);
  }

  .kpi-title {
    font-size: var(--text-h2);
  }
}

@media (max-width: 480px) {
  .kpi-card {
    flex: 0 0 100%;
  }
}
</style>
