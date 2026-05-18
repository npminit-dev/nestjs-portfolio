<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const currentYear = new Date().getFullYear()

const footerRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.footer-inner > *', {
      scrollTrigger: {
        trigger: footerRef.value,
        start: 'top 90%'
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    })
  }, footerRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <footer ref="footerRef" class="footer">
    <div class="footer-inner">
      <p class="copyright">
        &copy; {{ currentYear }} Jorge Balsamo. {{ $t('footer.copyright') }}
      </p>

      <div class="social-links">
        <a href="https://github.com" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
          <i class="pi pi-github"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
          <i class="pi pi-linkedin"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener" class="social-link" aria-label="Twitter">
          <i class="pi pi-twitter"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: var(--space-2xl) var(--container-padding);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: var(--color-background);
}

.footer-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.copyright {
  font-size: var(--text-small);
  color: var(--color-text-muted);
}

.social-links {
  display: flex;
  gap: var(--space-lg);
}

.social-link {
  color: var(--color-text-muted);
  font-size: var(--text-body-lg);
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.social-link:hover {
  color: var(--color-accent);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    gap: var(--space-lg);
    text-align: center;
  }
}
</style>