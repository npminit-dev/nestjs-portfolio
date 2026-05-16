<script setup lang="ts">
const typography = [
  { label: 'Display', size: 'text-display', weight: 'Bold' },
  { label: 'Heading 1', size: 'text-h1', weight: 'SemiBold' },
  { label: 'Heading 2', size: 'text-h2', weight: 'SemiBold' },
  { label: 'Heading 3', size: 'text-h3', weight: 'Medium' },
  { label: 'Body Large', size: 'text-body-lg', weight: 'Regular' },
  { label: 'Body', size: 'text-body', weight: 'Regular' },
  { label: 'Small', size: 'text-small', weight: 'Regular' },
  { label: 'Tiny', size: 'text-tiny', weight: 'Regular' },
]

const fonts = [
  { name: 'Playfair Display', var: '--font-heading', sample: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Inter', var: '--font-body', sample: 'The quick brown fox jumps over the lazy dog' },
  { name: 'JetBrains Mono', var: '--font-mono', sample: 'The quick brown fox jumps over the lazy dog' },
]

const colors = [
  { name: 'Background', var: '--color-background', desc: 'Main dark base' },
  { name: 'Surface', var: '--color-surface', desc: 'Cards & containers' },
  { name: 'Surface Elevated', var: '--color-surface-elevated', desc: 'Modals & dropdowns' },
  { name: 'Text Primary', var: '--color-text-primary', desc: 'Headings & body' },
  { name: 'Text Secondary', var: '--color-text-secondary', desc: 'Supporting text' },
  { name: 'Text Muted', var: '--color-text-muted', desc: 'Placeholders' },
]

const accents = [
  { name: 'Accent Primary', var: '--color-accent', desc: 'Teal - Primary actions' },
  { name: 'Accent Hover', var: '--color-accent-hover', desc: 'Teal hover state' },
  { name: 'Accent Light', var: '--color-accent-light', desc: 'Teal background' },
  { name: 'Accent Muted', var: '--color-accent-muted', desc: 'Subtle teal tint' },
  { name: 'Accent Secondary', var: '--color-accent-secondary', desc: 'Amber - Highlights' },
  { name: 'Accent Secondary Hover', var: '--color-accent-secondary-hover', desc: 'Amber hover' },
]

const gradients = [
  { name: 'Accent Gradient', vars: ['--color-accent', '--color-accent-secondary'], angle: '135deg' },
  { name: 'Dark Gradient', vars: ['--color-background', '--color-surface'], angle: '180deg' },
]

const spacing = [0.25, 0.5, 1, 1.5, 2, 3, 4, 6]

const buttons = [
  { label: 'Primary', class: 'btn-primary' },
  { label: 'Secondary', class: 'btn-secondary' },
  { label: 'Outline', class: 'btn-outline' },
  { label: 'Ghost', class: 'btn-ghost' },
]
</script>

<template>
  <div class="design-system">
    <header class="header">
      <h1>Design System</h1>
      <p class="subtitle">Dark theme palette & typography</p>
    </header>

    <section class="section colors-main">
      <h2>Primary Colors</h2>
      <div class="color-showcase">
        <div v-for="c in colors" :key="c.name" class="color-card">
          <div class="color-large" :style="{ backgroundColor: 'var(' + c.var + ')' }"></div>
          <div class="color-info">
            <span class="color-name">{{ c.name }}</span>
            <code>{{ c.var }}</code>
            <span class="color-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section colors-accent">
      <h2>Accent Colors</h2>
      <div class="color-showcase accent-grid">
        <div v-for="a in accents" :key="a.name" class="color-card accent-card">
          <div class="color-large" :style="{ backgroundColor: 'var(' + a.var + ')' }"></div>
          <div class="color-info">
            <span class="color-name">{{ a.name }}</span>
            <code>{{ a.var }}</code>
            <span class="color-desc">{{ a.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section colors-gradients">
      <h2>Gradients</h2>
      <div class="gradient-showcase">
        <div v-for="g in gradients" :key="g.name" class="gradient-card">
          <div 
            class="gradient-swatch"
            :style="{ background: 'linear-gradient(' + g.angle + ', var(' + g.vars[0] + '), var(' + g.vars[1] + '))' }"
          ></div>
          <div class="gradient-info">
            <span class="gradient-name">{{ g.name }}</span>
            <code>{{ g.vars[0] }} → {{ g.vars[1] }}</code>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Typography</h2>
      <div class="typography-showcase">
        <div v-for="t in typography" :key="t.label" class="type-row">
          <span :class="t.size">{{ t.label }}</span>
          <div class="type-meta">
            <code>var(--{{ t.size }})</code>
            <span class="type-weight">{{ t.weight }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Font Families</h2>
      <div class="fonts-showcase">
        <div v-for="f in fonts" :key="f.name" class="font-card">
          <p :style="{ fontFamily: 'var(' + f.var + ')' }" class="font-sample">{{ f.sample }}</p>
          <div class="font-info">
            <span class="font-name">{{ f.name }}</span>
            <code>var(--{{ f.var }})</code>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Spacing Scale</h2>
      <div class="spacing-showcase">
        <div v-for="s in spacing" :key="s" class="spacing-item">
          <div class="spacing-bar" :style="{ width: 'calc(var(--space-xs) * ' + s + ')' }"></div>
          <span class="spacing-label">{{ s }}</span>
          <code>--space-{{ s === 0.25 ? 'xs' : s === 0.5 ? 'sm' : s === 1 ? 'md' : s === 1.5 ? 'lg' : s === 2 ? 'xl' : s === 3 ? '2xl' : s === 4 ? '3xl' : '4xl' }}</code>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Buttons</h2>
      <div class="buttons-showcase">
        <button v-for="b in buttons" :key="b.label" :class="b.class">{{ b.label }}</button>
      </div>
    </section>

    <section class="section">
      <h2>Border Radius</h2>
      <div class="radius-showcase">
        <div class="radius-item">
          <div class="radius-box radius-sm"></div>
          <span>Small (4px)</span>
        </div>
        <div class="radius-item">
          <div class="radius-box radius-md"></div>
          <span>Medium (8px)</span>
        </div>
        <div class="radius-item">
          <div class="radius-box radius-lg"></div>
          <span>Large (12px)</span>
        </div>
        <div class="radius-item">
          <div class="radius-box radius-full"></div>
          <span>Full</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.design-system {
  padding: var(--space-3xl) var(--space-xl);
  max-width: 1100px;
  margin: 0 auto;
  background: var(--color-background);
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: var(--space-4xl);
}

h1 {
  font-family: var(--font-heading);
  font-size: var(--text-display);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.subtitle {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
}

h2 {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
}

.section {
  margin-bottom: var(--space-4xl);
  padding-bottom: var(--space-2xl);
  border-bottom: 1px solid var(--color-gray-800);
}

.color-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-lg);
}

.accent-grid {
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
}

.color-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-gray-800);
}

.color-large {
  height: 100px;
  border-bottom: 1px solid var(--color-gray-800);
}

.color-info {
  padding: var(--space-md);
}

.color-name {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.color-info code {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-tiny);
  color: var(--color-accent);
  margin-bottom: var(--space-xs);
}

.color-desc {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-small);
  color: var(--color-text-muted);
}

.gradient-showcase {
  display: flex;
  gap: var(--space-xl);
  flex-wrap: wrap;
}

.gradient-card {
  flex: 1;
  min-width: 200px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-gray-800);
}

.gradient-swatch {
  height: 80px;
}

.gradient-info {
  padding: var(--space-md);
}

.gradient-name {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.gradient-info code {
  font-family: var(--font-mono);
  font-size: var(--text-tiny);
  color: var(--color-text-muted);
}

.typography-showcase {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.type-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  background: var(--color-surface);
  border-radius: var(--radius-md);
}

.text-display { font-size: var(--text-display); font-weight: var(--font-bold); color: var(--color-text-primary); }
.text-h1 { font-size: var(--text-h1); font-weight: var(--font-semibold); color: var(--color-text-primary); }
.text-h2 { font-size: var(--text-h2); font-weight: var(--font-semibold); color: var(--color-text-primary); }
.text-h3 { font-size: var(--text-h3); font-weight: var(--font-medium); color: var(--color-text-primary); }
.text-body-lg { font-size: var(--text-body-lg); color: var(--color-text-primary); }
.text-body { font-size: var(--text-body); color: var(--color-text-primary); }
.text-small { font-size: var(--text-small); color: var(--color-text-primary); }
.text-tiny { font-size: var(--text-tiny); color: var(--color-text-primary); }

.type-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.type-meta code {
  font-family: var(--font-mono);
  font-size: var(--text-tiny);
  color: var(--color-text-muted);
}

.type-weight {
  font-family: var(--font-mono);
  font-size: var(--text-tiny);
  color: var(--color-accent);
}

.fonts-showcase {
  display: grid;
  gap: var(--space-lg);
}

.font-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  border: 1px solid var(--color-gray-800);
}

.font-sample {
  font-size: var(--text-h3);
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

.font-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.font-name {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
}

.font-info code {
  font-family: var(--font-mono);
  font-size: var(--text-tiny);
  color: var(--color-accent);
}

.spacing-showcase {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.spacing-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-surface);
  border-radius: var(--radius-md);
}

.spacing-bar {
  height: 24px;
  background: var(--color-accent);
  border-radius: var(--radius-sm);
  min-width: 4px;
}

.spacing-label {
  font-family: var(--font-mono);
  font-size: var(--text-body);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
  min-width: 40px;
}

.spacing-item code {
  font-family: var(--font-mono);
  font-size: var(--text-tiny);
  color: var(--color-text-muted);
}

.buttons-showcase {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary, .btn-outline, .btn-ghost {
  padding: var(--space-sm) var(--space-xl);
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--font-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
}

.btn-primary {
  background: var(--color-accent);
  color: var(--color-gray-950);
  border: none;
}
.btn-primary:hover {
  background: var(--color-accent-hover);
}

.btn-secondary {
  background: var(--color-accent-secondary);
  color: var(--color-gray-950);
  border: none;
}
.btn-secondary:hover {
  background: var(--color-accent-secondary-hover);
}

.btn-outline {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-gray-500);
}
.btn-outline:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: none;
}
.btn-ghost:hover {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

.radius-showcase {
  display: flex;
  gap: var(--space-xl);
  flex-wrap: wrap;
}

.radius-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.radius-box {
  background: var(--color-accent);
  width: 60px;
  height: 60px;
}

.radius-sm { border-radius: var(--radius-sm); }
.radius-md { border-radius: var(--radius-md); }
.radius-lg { border-radius: var(--radius-lg); }
.radius-full { border-radius: var(--radius-full); }

.radius-item span {
  font-family: var(--font-body);
  font-size: var(--text-small);
  color: var(--color-text-secondary);
}
</style>