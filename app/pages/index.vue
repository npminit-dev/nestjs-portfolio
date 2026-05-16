<script setup lang="ts">
import HeroSection from '~/components/HeroSection.vue';
import AboutSection from '~/components/AboutSection.vue';
import ServicesSection from '~/components/ServicesSection.vue';
import SkillsSection from '~/components/SkillsSection.vue';
import ProjectsSection from '~/components/ProjectsSection.vue';
</script>

<template>
  <div class="home">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <SkillsSection />
    <ProjectsSection />
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}
</style>