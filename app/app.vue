<script setup lang="ts">
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <DesignShowcase />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>