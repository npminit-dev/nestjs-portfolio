<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
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
  padding: var(--space-xl) var(--container-padding);
  border-top: 1px solid var(--color-gray-700);
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
  gap: var(--space-md);
}

.social-link {
  color: var(--color-text-muted);
  font-size: var(--text-body);
  transition: color var(--duration-fast) var(--ease-default);
}

.social-link:hover {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    gap: var(--space-md);
    text-align: center;
  }
}
</style>