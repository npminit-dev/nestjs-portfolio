<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import catDesktop from '~/assets/img/value-cat-desktop.webp'
import catDesktopSmall from '~/assets/img/value-cat-desktop-small.webp'

gsap.registerPlugin(ScrollTrigger, SplitText)

const sectionRef = ref<HTMLElement | null>(null)
const foundationRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null
let mm: gsap.MatchMedia | null = null

const pool = [
  { id: '01', titleKey: 'valueStack.roles.0.title', descKey: 'valueStack.roles.0.description', hue: 'accent' },
  { id: '02', titleKey: 'valueStack.roles.1.title', descKey: 'valueStack.roles.1.description', hue: 'secondary' },
  { id: '03', titleKey: 'valueStack.roles.2.title', descKey: 'valueStack.roles.2.description', hue: 'accent' },
  { id: '04', titleKey: 'valueStack.roles.3.title', descKey: 'valueStack.roles.3.description', hue: 'secondary' },
  { id: '05', titleKey: 'valueStack.roles.4.title', descKey: 'valueStack.roles.4.description', hue: 'accent' },
  { id: '06', titleKey: 'valueStack.roles.5.title', descKey: 'valueStack.roles.5.description', hue: 'secondary' },
]

const visibleIndices = ref(new Set([0, 1, 2, 3, 4, 5]))

const canAdd = computed(() => visibleIndices.value.size < pool.length)
const canRemove = computed(() => visibleIndices.value.size > 0)
const hasCards = computed(() => visibleIndices.value.size > 0)

const nextIdx = computed(() => {
  for (let i = 0; i < pool.length; i++) {
    if (!visibleIndices.value.has(i)) return i
  }
  return null
})

const topIdx = computed(() => Math.max(...visibleIndices.value))

function addLayer() {
  const idx = nextIdx.value
  if (idx === null) return
  visibleIndices.value = new Set([...visibleIndices.value, idx])
  const el = document.querySelector(`[data-i="${idx}"]`) as HTMLElement | undefined
  if (!el) return
  gsap.fromTo(el,
    { x: 15, y: -60, opacity: 0, rotation: 4 },
    { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.5, ease: 'power3.out', transformOrigin: 'top right' }
  )
  const dot = el.querySelector('.stack-node')
  if (dot) gsap.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, delay: 0.15, ease: 'back.out(2)' })
}

function removeLayer() {
  if (!canRemove.value) return
  const idx = topIdx.value
  visibleIndices.value = new Set([...visibleIndices.value].filter(i => i !== idx))
  const el = document.querySelector(`[data-i="${idx}"]`) as HTMLElement | undefined
  if (!el) return
  gsap.to(el, {
    x: 15, y: -60, opacity: 0, rotation: 4,
    duration: 0.35, ease: 'power3.in', transformOrigin: 'top right',
  })
  const dot = el.querySelector('.stack-node')
  if (dot) gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 })
}

function resetLayers() {
  if (!hasCards.value) return
  ;[...visibleIndices.value].forEach(idx => {
    const el = document.querySelector(`[data-i="${idx}"]`) as HTMLElement | undefined
    if (!el) return
    gsap.to(el, {
      x: 15, y: -60, opacity: 0, rotation: 4,
      duration: 0.3, ease: 'power3.in', transformOrigin: 'top right',
    })
    const dot = el.querySelector('.stack-node')
    if (dot) gsap.to(dot, { scale: 0, opacity: 0, duration: 0.15 })
  })
  visibleIndices.value = new Set()
}

function activeSelector() {
  return [...visibleIndices.value].map(i => `[data-i="${i}"]`).join(',')
}

function hiddenSelector() {
  return pool
    .map((_, i) => i)
    .filter(i => !visibleIndices.value.has(i))
    .map(i => `[data-i="${i}"]`)
    .join(',')
}

onMounted(() => {
  mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set([
      '.stack-header', '.stack-layer', '.stack-foundation',
      '.stack-node', '.stack-cat',
    ], { y: 0, opacity: 1, scaleX: 1, scaleY: 1, x: 0, rotation: 0 })
  }, sectionRef.value as Element)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    ctx = gsap.context(() => {
      const activeSel = activeSelector()
      if (activeSel) gsap.set(activeSel, { x: 15, y: -60, opacity: 0, rotation: 4 })
      if (activeSel) gsap.set(activeSel.split(',').map(s => s.trim() + ' .stack-node').join(','), { scale: 0, opacity: 0 })

      const headerSplit = SplitText.create('.stack-title', {
        type: 'chars',
        charsClass: 'stack-title-char',
      })

      gsap.from('.stack-cat', {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })

      gsap.from('.stack-label', {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      })

      gsap.from(headerSplit.chars, {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
        autoAlpha: 0,
        duration: 0.35,
        stagger: 0.02,
        ease: 'power2.out',
      })

      gsap.fromTo(activeSelector(),
        { x: 15, y: -60, opacity: 0, rotation: 4 },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 70%',
            once: true,
          },
          x: 0, y: 0, opacity: 1, rotation: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power3.out',
          transformOrigin: 'top right',
        }
      )

      gsap.fromTo(activeSelector().split(',').map(s => s.trim() + ' .stack-node').join(','),
        { scale: 0, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 68%',
            once: true,
          },
          scale: 1, opacity: 1,
          duration: 0.35,
          stagger: 0.12,
          delay: 0.25,
          ease: 'back.out(2)',
        }
      )

      gsap.from('.stack-actions', {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 50%',
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      })

      gsap.from('.stack-foundation', {
        scrollTrigger: {
          trigger: foundationRef.value,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })

      return () => {
        headerSplit.revert()
      }
    }, sectionRef.value)
  }, sectionRef.value as Element)
})

onUnmounted(() => {
  ctx?.revert()
  mm?.kill()
})
</script>

<template>
  <section ref="sectionRef" class="stack-section">
    <div class="stack-deco" aria-hidden="true" />
    <div class="container">
      <div class="stack-grid">
        <div class="stack-left">
          <picture class="stack-cat-wrap">
            <source media="(max-width: 768px)" :srcset="catDesktopSmall">
            <img :src="catDesktop" alt="Cat" class="stack-cat">
          </picture>
        </div>

        <div class="stack-right">
          <header class="stack-header">
            <span class="stack-label">{{ $t('valueStack.sectionLabel') }}</span>
            <h2 class="stack-title">
              {{ $t('valueStack.title') }}
            </h2>
          </header>

          <div class="stack-actions">
            <button
              class="stack-btn"
              :disabled="!canAdd"
              @click="addLayer"
            >
              <i class="pi pi-plus" style="font-size: 0.75rem"></i>
              {{ $t('valueStack.btnPush') }}
            </button>
            <button
              class="stack-btn"
              :disabled="!canRemove"
              @click="removeLayer"
            >
              <i class="pi pi-minus" style="font-size: 0.75rem"></i>
              {{ $t('valueStack.btnPop') }}
            </button>
            <button
              class="stack-btn"
              :disabled="!hasCards"
              @click="resetLayers"
            >
              <i class="pi pi-refresh" style="font-size: 0.75rem"></i>
              {{ $t('valueStack.btnReset') }}
            </button>
            <p class="stack-status">
              <template v-if="visibleIndices.size === 0">{{ $t('valueStack.statusEmpty') }}</template>
              <template v-else>{{ $t('valueStack.statusActive', { count: visibleIndices.size, total: pool.length }) }}</template>
            </p>
          </div>

          <div class="stack-tray">
            <div v-if="visibleIndices.size === 0" class="stack-placeholder">
              <div class="stack-placeholder-icon" aria-hidden="true">
                <i class="pi pi-plus-circle" style="font-size: 1.5rem; opacity: 0.3"></i>
              </div>
              <p class="stack-placeholder-text">{{ $t('valueStack.placeholderText') }}</p>
              <p class="stack-placeholder-hint">
                {{ $t('valueStack.placeholderHintBefore') }}<strong>{{ $t('valueStack.placeholderHintAction') }}</strong>{{ $t('valueStack.placeholderHintAfter') }}
              </p>
            </div>
            <div class="stack-tray-group">
              <article
                v-for="(layer, i) in pool"
                :key="layer.id"
                :data-i="i"
                class="stack-layer"
                :class="`stack-layer--${layer.hue}`"
              >
                <div class="stack-layer-body">
                  <div class="stack-layer-node-wrap">
                    <div class="stack-node" aria-hidden="true" />
                  </div>
                  <div class="stack-layer-content">
                    <h3 class="stack-layer-title">{{ $t(layer.titleKey) }}</h3>
                    <p class="stack-layer-desc">{{ $t(layer.descKey) }}</p>
                  </div>
                  <span class="stack-layer-id">{{ layer.id }}</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div ref="foundationRef" class="stack-foundation">
        <div class="stack-foundation-symbol" aria-hidden="true">
          <i class="pi pi-th-large" style="font-size: 1.5rem"></i>
        </div>
        <div class="stack-foundation-content">
          <span class="stack-foundation-label">{{ $t('valueStack.foundationLabel') }}</span>
          <p class="stack-foundation-text">{{ $t('valueStack.foundationText') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ── */
.stack-section {
  padding: calc(var(--space-4xl) / 2) 0 calc(var(--space-4xl) * 1.5);
  position: relative;
  background: rgba(10, 10, 11, 0.2);
}

.stack-section .container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.stack-deco {
  position: absolute;
  top: 50%;
  right: -250px;
  width: 500px;
  height: 500px;
  margin-top: -250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(185, 28, 60, 0.15), transparent 70%);
  filter: blur(60px);
  pointer-events: none;
  z-index: -1;
  animation: breathe 6s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.15); opacity: 1; }
}

/* ── Layout grid ── */
.stack-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: center;
}

/* ── Left column ── */
.stack-left {
  position: relative;
}

.stack-cat-wrap {
  position: sticky;
  top: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stack-cat {
  display: block;
  max-width: 100%;
  max-height: 800px;
  width: auto;
  height: auto;
  border-radius: 20px;
  filter: brightness(0.9);
  -webkit-mask-image: linear-gradient(to top, transparent 0%, transparent 5%, black 40%);
  mask-image: linear-gradient(to top, transparent 0%, transparent 5%, black 40%);
}

/* ── Right column ── */
.stack-right {
  position: relative;
}

/* ── Stack tray ── */
.stack-tray {
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: var(--space-md);
  overflow: hidden;
  position: relative;
}

.stack-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-3xl) var(--space-lg);
  text-align: center;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  animation: placeholderIn 0.3s ease 0.4s forwards;
}

@keyframes placeholderIn {
  to { opacity: 1; }
}

/* ── Stack status ── */
.stack-status {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: var(--text-tiny);
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
  align-self: center;
}

.stack-placeholder-icon {
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
}

.stack-placeholder-text {
  font-family: var(--font-heading);
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  margin: 0;
}

.stack-placeholder-hint {
  font-size: var(--text-small);
  color: var(--color-text-muted);
  margin: 0;
}

.stack-placeholder-hint strong {
  color: var(--color-accent);
  font-weight: var(--font-medium);
}

/* ── Header ── */
.stack-header {
  margin-bottom: var(--space-2xl);
  text-align: right;
}

.stack-label {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--font-medium);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
  position: relative;
}

.stack-label::after {
  content: '';
  position: absolute;
  bottom: -6px;
  right: 0;
  width: 24px;
  height: 1px;
  background: var(--color-accent);
  opacity: 0.4;
}

.stack-title {
  font-family: var(--font-heading);
  font-size: var(--text-display);
  font-weight: var(--font-semibold);
  line-height: 1.25;
  color: var(--color-text-primary);
  margin: 0;
  text-wrap: pretty;
}

/* ── Stack group (column-reverse = first card at bottom) ── */
.stack-tray-group {
  display: flex;
  flex-direction: column-reverse;
  gap: 6px;
}

/* ── Each layer card ── */
.stack-layer {
  position: relative;
  padding: 6px var(--space-lg);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 14px;
  opacity: 0;
  transition: background var(--duration-slower) var(--ease-elegant), border-color var(--duration-slower) var(--ease-elegant);
}

.stack-layer:hover {
  border-color: rgba(255, 255, 255, 0.08);
}

.stack-layer--accent {
  background: linear-gradient(
    135deg,
    rgba(185, 28, 60, 0.04) 0%,
    transparent 100%
  );
}

.stack-layer--secondary {
  background: linear-gradient(
    135deg,
    rgba(212, 138, 122, 0.04) 0%,
    transparent 100%
  );
}

.stack-layer--accent:hover {
  background: linear-gradient(
    135deg,
    rgba(185, 28, 60, 0.08) 0%,
    transparent 100%
  );
}

.stack-layer--secondary:hover {
  background: linear-gradient(
    135deg,
    rgba(212, 138, 122, 0.08) 0%,
    transparent 100%
  );
}

.stack-layer-body {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

.stack-layer-node-wrap {
  flex-shrink: 0;
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
}

.stack-node {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0.6;
  box-shadow: 0 0 8px rgba(185, 28, 60, 0.5), 0 0 16px rgba(185, 28, 60, 0.2);
  filter: blur(0.4px);
  position: relative;
  z-index: 1;
}

.stack-layer-content {
  flex: 1;
}

.stack-layer-id {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: var(--text-tiny);
  color: var(--color-text-muted);
  line-height: 1.3;
  padding-top: 2px;
  width: 24px;
  text-align: right;
}

.stack-layer-title {
  font-family: var(--font-heading);
  font-size: var(--text-body-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: 2px;
  line-height: 1.25;
}

.stack-layer-desc {
  font-size: var(--text-small);
  line-height: 1.35;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 100%;
  text-wrap: balance;
}

/* ── Stack actions (buttons) ── */
.stack-actions {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.stack-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: var(--text-tiny);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
}

.stack-btn:hover:not(:disabled) {
  border-color: var(--color-accent);
  color: var(--color-text-primary);
  background: var(--color-accent-light);
}

.stack-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ── Foundation card ── */
.stack-foundation {
  margin-top: var(--space-lg);
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    rgba(185, 28, 60, 0.08) 0%,
    rgba(39, 39, 42, 0.12) 100%
  );
  border-left: 2px solid var(--color-accent);
}

.stack-foundation-symbol {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  color: var(--color-accent);
  align-self: center;
}

.stack-foundation-content {
  flex: 1;
}

.stack-foundation-label {
  font-family: var(--font-mono);
  font-size: var(--text-tiny);
  font-weight: var(--font-medium);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-xs);
  display: block;
}

.stack-foundation-text {
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
  font-style: italic;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .stack-title {
    font-size: clamp(1.5rem, 4vw, var(--text-display));
  }

  .stack-deco {
    width: 300px;
    height: 300px;
    right: -150px;
    animation: none;
    opacity: 0.4;
  }
}

@media (max-width: 900px) {
  .stack-section {
    padding: var(--space-3xl) 0 var(--space-4xl);
  }

  .stack-grid {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .stack-left {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
    pointer-events: none;
    opacity: 0.06;
  }

  .stack-cat-wrap {
    position: static;
    width: auto;
    height: auto;
    max-width: min(320px, 50vw);
  }

  .stack-cat {
    mask-image: none;
    -webkit-mask-image: none;
    filter: none;
    width: 100%;
    height: auto;
    border-radius: 0;
  }

  .stack-right {
    position: relative;
    z-index: 1;
  }

  .stack-header {
    text-align: left;
  }

  .stack-label::after {
    right: auto;
    left: 0;
  }

  .stack-layer-body {
    text-align: left;
  }

  .stack-actions {
    flex-wrap: wrap;
  }

  .stack-status {
    margin-left: 0;
    width: 100%;
    text-align: left;
  }
}

@media (max-width: 768px) {
  .stack-section {
    padding: var(--space-2xl) 0 var(--space-3xl);
  }

  .stack-left {
    opacity: 0.05;
  }

  .stack-cat-wrap {
    max-width: min(240px, 55vw);
  }

  .stack-layer {
    padding: 4px var(--space-md);
  }

  .stack-tray-group {
    gap: 4px;
  }

  .stack-tray {
    padding: var(--space-sm);
  }

  .stack-layer-body {
    gap: var(--space-sm);
  }

  .stack-layer-id {
    width: 18px;
    font-size: 10px;
  }

  .stack-layer-node-wrap {
    width: 12px;
  }

  .stack-node {
    width: 4px;
    height: 4px;
  }

  .stack-layer-title {
    font-size: var(--text-body);
  }

  .stack-layer-desc {
    font-size: var(--text-small);
  }

  .stack-foundation {
    padding: var(--space-md);
    flex-direction: column;
    gap: var(--space-sm);
    max-width: 100%;
    text-align: center;
    align-items: center;
    border-left: none;
    border-bottom: 2px solid var(--color-accent);
    border-radius: var(--radius-lg);
  }

  .stack-foundation-symbol {
    align-self: center;
  }
}

@media (max-width: 480px) {
  .stack-section {
    padding: var(--space-xl) 0 var(--space-2xl);
  }

  .stack-left {
    opacity: 0.04;
  }

  .stack-cat-wrap {
    max-width: min(180px, 50vw);
  }

  .stack-header {
    margin-bottom: var(--space-lg);
  }

  .stack-label {
    font-size: 10px;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-sm);
  }

  .stack-title {
    font-size: clamp(1.2rem, 5.5vw, 1.5rem);
  }

  .stack-layer-body {
    gap: var(--space-xs);
    flex-wrap: wrap;
  }

  .stack-layer-id {
    width: 16px;
  }

  .stack-layer-node-wrap {
    width: 10px;
  }

  .stack-layer-content {
    width: 100%;
  }

  .stack-actions {
    gap: var(--space-xs);
  }

  .stack-btn {
    font-size: 10px;
    padding: 2px var(--space-xs);
  }

  .stack-foundation {
    padding: var(--space-sm);
    margin-top: var(--space-md);
  }

  .stack-foundation-text {
    font-size: var(--text-small);
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .stack-section {
    padding: var(--space-xl) 0;
  }

  .stack-header {
    margin-bottom: var(--space-md);
  }

  .stack-left {
    opacity: 0.04;
  }

  .stack-cat-wrap {
    max-width: min(200px, 35vw);
  }

  .stack-tray {
    max-height: 40vh;
    overflow-y: auto;
  }
}
</style>
