<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const heroRef = ref<HTMLElement | null>(null)
let mm: gsap.MatchMedia | null = null

const particles = Array.from({ length: 40 }, (_, i) => {
  const x = 3 + ((i * 37 + 13) % 88)
  const y = 3 + ((i * 53 + 7) % 88)
  const size = i < 15 ? 1 : i < 30 ? 2 : 3
  const baseOpacity = i < 15 ? 0.25 : i < 30 ? 0.3 : 0.35
  const color = i % 2 === 0
    ? `rgba(185, 28, 60, ${baseOpacity})`
    : `rgba(212, 138, 122, ${baseOpacity})`
  return { id: i, x, y, size, color }
})

const shapes = [
  { id: 'a', size: 'min(900px, 90vw)', top: '-18%', right: '-12%', borderColor: 'rgba(185, 28, 60, 0.1)', opacity: 0.08 },
  { id: 'b', size: 'min(600px, 65vw)', bottom: '-10%', left: '-10%', borderColor: 'rgba(185, 28, 60, 0.08)', opacity: 0.06 },
  { id: 'c', size: 'min(450px, 50vw)', top: '35%', left: '50%', backgroundColor: 'radial-gradient(circle, rgba(185, 28, 60, 0.08) 0%, transparent 70%)', opacity: 0.07 },
]

onMounted(() => {
  mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.hero-eyebrow', { y: 0, opacity: 1 })
    gsap.set('.hero-title', { y: 0, opacity: 1 })
    gsap.set('.hero-subtitle', { y: 0, opacity: 1 })
    gsap.set('.hero-cta', { y: 0, opacity: 1 })
    gsap.set('.particle', { scale: 1, opacity: 0.1 })
    gsap.set('.shape', { scale: 1, opacity: 0.04 })
    gsap.set('.hero-noise', { opacity: 0.5 })
  }, heroRef.value as Element)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const titleSplit = SplitText.create('.hero-title', {
      type: 'lines',
      linesClass: 'title-line',
      mask: 'lines'
    })

    const subtitleSplit = SplitText.create('.hero-subtitle', {
      type: 'chars',
      charsClass: 'subtitle-char'
    })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl
      .from('.hero-eyebrow', { y: 25, opacity: 0, duration: 0.4 })
      .from('.shape', { scale: 0.85, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }, '-=0.3')
      .from('.particle', { scale: 0, opacity: 0, duration: 0.35, stagger: 0.02, ease: 'power2.out' }, '-=0.4')
      .from(titleSplit.lines, {
        yPercent: 100,
        duration: 0.55,
        stagger: 0.1,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }, '-=0.2')
      .from(subtitleSplit.chars, {
        autoAlpha: 0,
        duration: 0.15,
        stagger: 0.005,
        ease: 'power2.out'
      }, '-=0.2')
      .from('.hero-cta', { y: 12, opacity: 0, duration: 0.35 }, '-=0.2')

    const floatTween = gsap.to('.particle', {
      y: () => gsap.utils.random(-18, -6),
      x: () => gsap.utils.random(-10, 10),
      duration: () => gsap.utils.random(3, 5),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      immediateRender: false
    })

    const scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom 80%',
        scrub: 1
      }
    })

    scrollTL
      .to('.hero-content', { yPercent: -8, scale: 0.95, ease: 'none' }, 0)
      .to('.shape', { scale: 1.15, opacity: 0.01, ease: 'none' }, 0)
      .to('.particle', { opacity: 0.03, ease: 'none' }, 0)

    return () => {
      floatTween.kill()
      titleSplit.revert()
      subtitleSplit.revert()
    }
  }, heroRef.value as Element)
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <section ref="heroRef" class="hero">
    <div class="hero-shapes" aria-hidden="true">
      <div
        v-for="s in shapes"
        :key="s.id"
        class="shape"
        :class="'shape-' + s.id"
        :style="{
          width: s.size,
          height: s.size,
          top: s.top ?? 'auto',
          right: s.right ?? 'auto',
          bottom: s.bottom ?? 'auto',
          left: s.left ?? 'auto',
          opacity: s.opacity,
        }"
      />
    </div>

    <div class="hero-particles" aria-hidden="true">
      <div
        v-for="p in particles"
        :key="p.id"
        class="particle"
        :style="{
          width: p.size + 'px',
          height: p.size + 'px',
          left: p.x + '%',
          top: p.y + '%',
          backgroundColor: p.color,
        }"
      />
    </div>

    <svg
      class="hero-noise"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <filter id="heroNoiseFilter">
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
        filter="url(#heroNoiseFilter)"
        opacity="0.025"
      />
    </svg>

    <div class="container">
      <div class="hero-content">
        <span class="hero-eyebrow">{{ $t('hero.eyebrow') }}</span>

        <h1 class="hero-title">
          {{ $t('hero.title1') }}<br>{{ $t('hero.title2') }}
        </h1>

        <p class="hero-subtitle">
          {{ $t('hero.subtitle') }}
        </p>

        <div class="hero-cta">
          <NuxtLink to="/contact" class="cta-button">
            <span class="cta-label">{{ $t('hero.cta') }}</span>
            <i class="pi pi-arrow-right arrow" aria-hidden="true"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 70px;
  overflow: hidden;
}

.hero-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}

.shape-a {
  border: 1px solid rgba(185, 28, 60, 0.04);
}

.shape-b {
  border: 1px solid rgba(212, 138, 122, 0.03);
}

.shape-c {
  background: radial-gradient(circle, rgba(185, 28, 60, 0.04) 0%, transparent 70%);
}

.hero-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}

.hero-noise {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: overlay;
  z-index: 1;
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
  position: relative;
  z-index: 2;
}

.hero-eyebrow {
  display: inline-block;
  font-size: var(--text-small);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
  position: relative;
}

.hero-eyebrow::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 1px;
  background: var(--color-accent);
  opacity: 0.4;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 5vw, var(--text-display));
  font-weight: var(--font-bold);
  line-height: 1.15;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
  overflow-wrap: break-word;
}

.hero-subtitle {
  font-size: clamp(var(--text-body), 2.5vw, var(--text-body-lg));
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 580px;
  margin: 0 auto var(--space-2xl);
  padding: 0 var(--space-sm);
}

.hero-cta {
  display: flex;
  justify-content: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-md);
  padding: 0 0 2px;
  font-size: var(--text-body);
  font-weight: var(--font-medium);
  color: var(--color-accent);
  text-decoration: none;
  position: relative;
  overflow: visible;
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--duration-normal) var(--ease-default);
}

.cta-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.cta-button .cta-label {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.cta-button .arrow {
  font-size: 1.25rem;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.cta-button:hover {
  color: var(--color-text-primary);
}

.cta-button:hover::after {
  transform: scaleX(0);
  transform-origin: right;
}

.cta-button:hover .cta-label {
  transform: translateX(-4px);
}

.cta-button:hover .arrow {
  transform: translateX(6px);
}

.cta-button:active {
  color: var(--color-accent-hover);
}

@media (max-width: 768px) {
  .hero {
    min-height: 85vh;
    min-height: 85dvh;
    padding-top: 64px;
  }

  .hero-eyebrow {
    font-size: clamp(10px, 2vw, var(--text-small));
    letter-spacing: 0.15em;
  }

  .hero-title {
    font-size: clamp(1.5rem, 6vw, 2.25rem);
    margin-bottom: var(--space-lg);
  }

  .hero-subtitle {
    font-size: var(--text-body);
    margin-bottom: var(--space-xl);
  }

  .particle {
    opacity: 0.06;
  }

  .shape {
    opacity: 0.02;
  }

  .hero-noise {
    opacity: 0.4;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 80vh;
    min-height: 80dvh;
    padding-top: 56px;
    padding-bottom: var(--space-2xl);
  }

  .hero-eyebrow {
    font-size: 10px;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-md);
  }

  .hero-title {
    font-size: clamp(1.35rem, 7vw, 1.75rem);
    margin-bottom: var(--space-md);
  }

  .hero-subtitle {
    font-size: var(--text-small);
    padding: 0;
    margin-bottom: var(--space-lg);
  }

  .hero-cta {
    font-size: var(--text-small);
  }

  .cta-button {
    font-size: var(--text-small);
  }

  .particle {
    display: none;
  }

  .shape {
    display: none;
  }

  .hero-noise {
    opacity: 0.3;
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .hero {
    min-height: 100vh;
    min-height: 100dvh;
    padding-top: 56px;
    padding-bottom: var(--space-xl);
  }

  .hero-eyebrow {
    margin-bottom: var(--space-sm);
  }

  .hero-title {
    margin-bottom: var(--space-sm);
  }

  .hero-subtitle {
    margin-bottom: var(--space-md);
    max-width: 480px;
  }

  .particle {
    opacity: 0.04;
  }

  .shape-c {
    display: none;
  }
}
</style>
