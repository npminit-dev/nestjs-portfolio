<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Vue 3', 'TypeScript', 'Astro', 'GSAP', 'Framer Motion']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Supabase']
  },
  {
    title: 'Mobile',
    skills: ['React Native', 'Expo', 'React Navigation', 'Reanimated', 'NativeWind']
  },
  {
    title: 'Tools',
    skills: ['Git', 'Docker', 'Vercel', 'Jest', 'Figma MCP', 'Claude Code']
  }
]

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.skills-header', {
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

    gsap.from('.skill-category', {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 75%'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out'
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="skills section">
    <div class="container">
      <div class="skills-header">
        <span class="section-label">Skills</span>
        <h2 class="section-title">Technologies I work with</h2>
      </div>
      
      <div class="skills-grid">
        <div 
          v-for="(category, index) in skillCategories" 
          :key="index"
          class="skill-category"
        >
          <h3 class="category-title">{{ category.title }}</h3>
          <div class="skill-tags">
            <span 
              v-for="(skill, sIndex) in category.skills" 
              :key="sIndex"
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  padding: var(--space-4xl) 0;
  background: var(--color-surface);
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.skills-header {
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
}

.skill-category {
  padding: var(--space-lg);
  background: var(--color-background);
  border: 1px solid var(--color-gray-700);
  border-radius: var(--radius-lg);
}

.category-title {
  font-size: var(--text-body-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-gray-700);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.skill-tag {
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-accent-muted);
  color: var(--color-accent);
  font-size: var(--text-small);
  font-weight: var(--font-medium);
  border-radius: var(--radius-sm);
}

@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>