<script setup lang="ts">
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="container"></div>
    </section>

    <section class="section about">
      <div class="container"></div>
    </section>

    <section class="section services">
      <div class="container"></div>
    </section>

    <section class="section skills">
      <div class="container"></div>
    </section>

    <section class="section projects">
      <div class="container"></div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.hero {
  min-height: calc(100vh - 80px);
  padding: var(--space-4xl) 0;
}

.section {
  padding: var(--space-4xl) 0;
  min-height: 60vh;
}
</style>