<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null
let mm: gsap.MatchMedia | null = null

onMounted(() => {
  mm = gsap.matchMedia(sectionRef.value)

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.cta-curtain', { '--radius': 100 })
    gsap.set('.cta-content > *', { opacity: 1, y: 0 })
  })

  mm.add('(max-width: 767px)', () => {
    gsap.set('.cta-curtain', { '--radius': 100 })
    gsap.set('.cta-content > *', { opacity: 1, y: 0 })
  })

  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    ctx = gsap.context(() => {
      gsap.set('.cta-curtain', { '--radius': 0 })
      gsap.set('.cta-content > *', { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top bottom',
          end: 'top 10%',
          scrub: 1.5,
        }
      })

      tl.to('.cta-curtain', {
        '--radius': 100,
        ease: 'power3.inOut',
      })

      tl.to('.cta-content > *', {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.2')
    }, sectionRef.value)
  })
})

onUnmounted(() => {
  ctx?.revert()
  mm?.kill()
})
</script>

<template>
  <section ref="sectionRef" class="cta-section">
    <div class="container">
      <div class="cta-content">
        <span class="cta-label">{{ $t('cta.label') }}</span>
        <h2 class="cta-title">{{ $t('cta.title') }}</h2>
        <p class="cta-text">{{ $t('cta.text') }}</p>
        <NuxtLink to="/contact" class="cta-link">
          <span>{{ $t('cta.link') }}</span>
          <i class="pi pi-arrow-right" aria-hidden="true"></i>
        </NuxtLink>
      </div>
    </div>
    <div class="cta-curtain" aria-hidden="true" />
  </section>
</template>

<style scoped>
.cta-section {
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: center;
  background: transparent;
  overflow: hidden;
}

.container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--space-4xl) var(--container-padding);
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.cta-curtain {
  --radius: 0;
  position: absolute;
  inset: 0;
  background: #000;
  z-index: 2;
  pointer-events: none;
  mask-image: radial-gradient(circle at 50% 50%, transparent calc(var(--radius) * 1%), #000 calc(var(--radius) * 1% + 1%));
  -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent calc(var(--radius) * 1%), #000 calc(var(--radius) * 1% + 1%));
}

.cta-label {
  display: inline-block;
  font-size: var(--text-small);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
  position: relative;
}

.cta-label::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 1px;
  background: var(--color-accent);
  opacity: 0.4;
}

.cta-title {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  line-height: 1.25;
  margin: 0 0 var(--space-md);
  text-wrap: pretty;
}

.cta-text {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-xl);
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  color: white;
  font-size: var(--text-body);
  font-weight: var(--font-semibold);
  text-decoration: none;
  padding: var(--space-sm) var(--space-xl);
  background: var(--color-accent);
  border-radius: var(--radius-md);
  transition:
    background var(--duration-normal) var(--ease-out),
    gap var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-out);
}

.cta-link:hover {
  background: var(--color-accent-hover);
  gap: calc(var(--space-sm) + 4px);
  transform: translateY(-1px);
}

.cta-link i {
  transition: transform var(--duration-normal) var(--ease-out);
}

.cta-link:hover i {
  transform: translateX(3px);
}

@media (max-width: 1024px) {
  .cta-title {
    font-size: clamp(1.5rem, 4vw, var(--text-h1));
  }
}

@media (max-width: 768px) {
  .cta-section {
    min-height: auto;
  }

  .container {
    padding: var(--space-3xl) var(--container-padding);
  }

  .cta-title {
    font-size: clamp(1.35rem, 4.5vw, var(--text-h2));
  }

  .cta-text {
    font-size: var(--text-body);
  }

  .cta-label {
    font-size: clamp(10px, 2vw, var(--text-small));
    letter-spacing: 0.15em;
  }
}

@media (max-width: 480px) {
  .container {
    padding: var(--space-2xl) var(--container-padding);
  }

  .cta-label {
    font-size: 10px;
    margin-bottom: var(--space-sm);
  }

  .cta-title {
    font-size: clamp(1.2rem, 5.5vw, 1.5rem);
    margin-bottom: var(--space-sm);
  }

  .cta-text {
    font-size: var(--text-small);
    margin-bottom: var(--space-lg);
  }

  .cta-link {
    font-size: var(--text-small);
    padding: var(--space-xs) var(--space-lg);
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .cta-section {
    min-height: 70vh;
  }

  .container {
    padding: var(--space-xl) var(--container-padding);
  }

  .cta-title {
    margin-bottom: var(--space-sm);
  }

  .cta-text {
    margin-bottom: var(--space-md);
  }
}
</style>
