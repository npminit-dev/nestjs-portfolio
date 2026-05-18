<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useCircuitTrails } from '~/composables/useCircuitTrails'

const circuitCanvas = ref<HTMLCanvasElement | null>(null)
const { start: startCircuits, stop: stopCircuits } = useCircuitTrails(circuitCanvas)
let mm: gsap.MatchMedia | null = null

onMounted(() => {
  mm = gsap.matchMedia()
  startCircuits()

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.bg-wrapper', { opacity: 1 })
    gsap.set('.bg-gradient', { opacity: 1 })
    gsap.set('.bg-circuits', { opacity: 0.5 })
    gsap.set('.bg-grid', { opacity: 0.5 })
  })

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.to('.bg-wrapper', { opacity: 1, duration: 0.7, ease: 'power2.out' })
    gsap.from('.bg-gradient', { opacity: 0, duration: 0.8, ease: 'power3.out' })
  })
})

onUnmounted(() => {
  stopCircuits()
  mm?.revert()
})
</script>

<template>
  <div class="bg-wrapper" aria-hidden="true">
    <div class="bg-gradient"></div>

    <div class="bg-grid"></div>

    <canvas ref="circuitCanvas" class="bg-circuits" />

    <svg
      class="bg-noise"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
    >
      <filter id="bgNoiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="2.5"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect
        width="100%"
        height="100%"
        filter="url(#bgNoiseFilter)"
        opacity="0.025"
      />
    </svg>
  </div>
</template>

<style scoped>
.bg-wrapper {
  position: fixed;
  inset: 0;
  top: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;
}

.bg-gradient {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(ellipse 55% 35% at 25% 20%, rgba(185, 28, 60, 0.10) 0%, transparent 50%),
    radial-gradient(ellipse 45% 25% at 75% 65%, rgba(212, 138, 122, 0.05) 0%, transparent 40%),
    radial-gradient(ellipse 35% 25% at 60% 25%, rgba(185, 28, 60, 0.06) 0%, transparent 40%),
    radial-gradient(ellipse 40% 30% at 20% 80%, rgba(212, 138, 122, 0.03) 0%, transparent 35%);
  will-change: transform;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 50% 45% at center, transparent 25%, black 65%);
  -webkit-mask-image: radial-gradient(ellipse 50% 45% at center, transparent 25%, black 65%);
  pointer-events: none;
  opacity: 0.95;
}

.bg-circuits {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.bg-noise {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: overlay;
  z-index: 1;
}

@media (max-width: 768px) {
  .bg-grid {
    background-size: 40px 40px;
  }
}
</style>
