<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.about-content > *', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out'
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="about section">
    <div class="container">
      <div class="about-inner">
        <div class="about-content">
          <span class="section-label">About</span>
          <h2 class="section-title">
            Crafting digital solutions<br/>with precision and purpose.
          </h2>
          <p class="section-description">
            Fullstack developer with 3+ years building production web applications using React, TypeScript, and Next.js. Frontend-first with full-stack capabilities in Node.js, databases, and React Native. Specialized in modern interfaces with advanced animations and AI-accelerated development workflows.
          </p>
          <div class="about-stats">
            <div class="stat">
              <span class="stat-number">3+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat">
              <span class="stat-number">20+</span>
              <span class="stat-label">Projects Delivered</span>
            </div>
            <div class="stat">
              <span class="stat-number">15+</span>
              <span class="stat-label">Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: var(--space-4xl) 0;
  background: var(--color-surface);
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.about-inner {
  max-width: var(--container-content-max);
  margin: 0 auto;
}

.section-label {
  display: inline-block;
  font-size: var(--text-tiny);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  margin-bottom: var(--space-md);
}

.section-title {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--font-semibold);
  line-height: 1.2;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
}

.section-description {
  font-size: var(--text-body-lg);
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2xl);
}

.about-stats {
  display: flex;
  gap: var(--space-2xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--color-gray-700);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.stat-number {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.stat-label {
  font-size: var(--text-small);
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .about-stats {
    flex-direction: column;
    gap: var(--space-lg);
  }
}
</style>