<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

const projects = [
  {
    title: 'PropulsE Platform',
    description: '5-screen platform with advanced GSAP animations and Google Maps API integration. Delivered in 1 week using AI-accelerated development.',
    tech: ['React', 'Next.js', 'TypeScript', 'GSAP', 'Google Maps API'],
    highlight: '1 week delivery'
  },
  {
    title: 'GrowForce Landing',
    description: 'High-performance landing page with Lighthouse 98+, pixel-perfect responsive design, lazy loading and image optimization.',
    tech: ['Astro', 'TailwindCSS', 'GSAP', 'SEO'],
    highlight: 'Lighthouse 98+'
  },
  {
    title: 'iEscrow Token Presale',
    description: 'Production Web3 platform for staking and token presale with real-time on-chain graphics and blockchain integration.',
    tech: ['Next.js', 'Wagmi', 'Solidity', 'Supabase'],
    highlight: 'Web3'
  }
]

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.projects-header', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.6
    })

    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="projects section">
    <div class="container">
      <div class="projects-header">
        <span class="section-label">Projects</span>
        <h2 class="section-title">Featured work</h2>
        <p class="section-subtitle">Production applications built with modern technologies</p>
      </div>
      
      <div class="projects-grid">
        <article 
          v-for="(project, index) in projects" 
          :key="index"
          class="project-card"
        >
          <div class="project-header">
            <h3 class="project-title">{{ project.title }}</h3>
            <span class="project-highlight">{{ project.highlight }}</span>
          </div>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tech">
            <span 
              v-for="(tech, tIndex) in project.tech" 
              :key="tIndex"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </article>
      </div>
      
      <div class="projects-cta">
        <NuxtLink to="/contact" class="cta-link">
          <span>View all projects</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: var(--space-4xl) 0;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.projects-header {
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
  margin-bottom: var(--space-sm);
}

.section-subtitle {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.project-card {
  padding: var(--space-xl);
  background: var(--color-surface);
  border: 1px solid var(--color-gray-700);
  border-radius: var(--radius-lg);
  transition: all var(--duration-normal) var(--ease-default);
}

.project-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-md);
}

.project-title {
  font-size: var(--text-h3);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.project-highlight {
  font-size: var(--text-tiny);
  font-weight: var(--font-medium);
  color: var(--color-accent);
  background: var(--color-accent-muted);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.project-description {
  font-size: var(--text-body);
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.tech-tag {
  font-size: var(--text-tiny);
  color: var(--color-text-muted);
  padding: var(--space-xs) 0;
}

.tech-tag:not(:last-child)::after {
  content: '·';
  margin-left: var(--space-xs);
  color: var(--color-gray-600);
}

.projects-cta {
  text-align: center;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--text-body);
  font-weight: var(--font-medium);
  color: var(--color-accent);
  text-decoration: none;
  transition: gap var(--duration-fast) var(--ease-default);
}

.cta-link:hover {
  gap: var(--space-md);
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>