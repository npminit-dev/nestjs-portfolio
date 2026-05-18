<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

const services = [
  {
    icon: 'pi pi-desktop',
    title: 'Frontend Development',
    description: 'Modern interfaces with React, Next.js, Vue 3, TypeScript, and advanced animations using GSAP and Framer Motion.'
  },
  {
    icon: 'pi pi-code',
    title: 'Full Stack Web',
    description: 'End-to-end applications with Node.js, Express, PostgreSQL, MongoDB, and REST API architecture.'
  },
  {
    icon: 'pi pi-mobile',
    title: 'Mobile Development',
    description: 'Cross-platform apps with React Native & Expo, delivering native performance on iOS and Android.'
  },
  {
    icon: 'pi pi-star',
    title: 'Animation & Motion',
    description: 'Scroll-triggered animations, parallax effects, and interactive UI experiences that delight users.'
  }
]

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.services-label', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    })

    gsap.from('.services-grid', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 70%'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    gsap.utils.toArray('.service-card').forEach((card: any, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out'
      })
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="services section">
    <div class="container">
      <div class="services-header">
        <span class="services-label section-label">Services</span>
        <h2 class="section-title">What I do</h2>
      </div>
      
      <div class="services-grid">
        <article 
          v-for="(service, index) in services" 
          :key="index"
          class="service-card"
        >
          <div class="service-icon">
            <i :class="service.icon"></i>
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding: var(--space-4xl) 0;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.services-header {
  text-align: center;
  margin-bottom: var(--space-3xl);
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
  color: var(--color-text-primary);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-xl);
}

.service-card {
  padding: var(--space-xl);
  background: var(--color-surface);
  border: 1px solid var(--color-gray-700);
  border-radius: var(--radius-lg);
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(20, 184, 166, 0.1);
}

.service-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-muted);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-lg);
}

.service-icon i {
  font-size: 1.25rem;
  color: var(--color-accent);
}

.service-title {
  font-size: var(--text-h3);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.service-description {
  font-size: var(--text-body);
  line-height: 1.6;
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>