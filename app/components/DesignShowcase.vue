<script setup lang="ts">
</script>

<template>
  <section class="design-showcase">
    <h2 class="title">Design System</h2>

    <div class="section">
      <h3 class="section-title">Colors - Primary (Dark Theme)</h3>
      <div class="color-grid">
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-background);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-text-primary);">Background</span>
            <span class="color-value">#0A0A0B</span>
          </div>
        </div>
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-surface); border: 1px solid var(--color-gray-700);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-text-primary);">Surface</span>
            <span class="color-value">#141416</span>
          </div>
        </div>
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-surface-elevated); border: 1px solid var(--color-gray-700);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-text-primary);">Surface Elevated</span>
            <span class="color-value">#1C1C1F</span>
          </div>
        </div>
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-text-primary);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-text-primary);">Text Primary</span>
            <span class="color-value">#F5F5F5</span>
          </div>
        </div>
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-text-secondary);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-text-secondary);">Text Secondary</span>
            <span class="color-value">#A3A3A3</span>
          </div>
        </div>
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-text-muted);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-text-muted);">Text Muted</span>
            <span class="color-value">#737373</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">Colors - Accent</h3>
      <div class="color-grid">
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-accent);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-accent);">Primary Accent (Teal)</span>
            <span class="color-value">#14B8A6</span>
          </div>
        </div>
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-accent-hover);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-accent-hover);">Accent Hover</span>
            <span class="color-value">#2DD4BF</span>
          </div>
        </div>
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-accent-light);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-text-secondary);">Accent Light</span>
            <span class="color-value">rgba(20,184,166,.125)</span>
          </div>
        </div>
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-accent-secondary);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-accent-secondary);">Secondary (Amber)</span>
            <span class="color-value">#F59E0B</span>
          </div>
        </div>
        <div class="color-item">
          <div class="color-swatch" style="background: var(--color-accent-secondary-hover);"></div>
          <div class="color-info">
            <span class="color-name" style="color: var(--color-accent-secondary-hover);">Secondary Hover</span>
            <span class="color-value">#FBBF24</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">Typography - Headings (Serif)</h3>
      <div class="type-showcase">
        <p class="type-sample display">The quick brown fox</p>
        <p class="type-meta">Display - 48px - 700</p>
      </div>
      <div class="type-showcase">
        <p class="type-sample h1">The quick brown fox</p>
        <p class="type-meta">H1 - 36px - 600</p>
      </div>
      <div class="type-showcase">
        <p class="type-sample h2">The quick brown fox</p>
        <p class="type-meta">H2 - 28px - 600</p>
      </div>
      <div class="type-showcase">
        <p class="type-sample h3">The quick brown fox</p>
        <p class="type-meta">H3 - 20px - 500</p>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">Typography - Body (Sans)</h3>
      <div class="type-showcase">
        <p class="type-sample body-lg">The quick brown fox jumps over the lazy dog</p>
        <p class="type-meta">Body Large - 18px - 400</p>
      </div>
      <div class="type-showcase">
        <p class="type-sample body">The quick brown fox jumps over the lazy dog</p>
        <p class="type-meta">Body - 16px - 400</p>
      </div>
      <div class="type-showcase">
        <p class="type-sample small">The quick brown fox jumps over the lazy dog</p>
        <p class="type-meta">Small - 14px - 400</p>
      </div>
      <div class="type-showcase">
        <p class="type-sample tiny">The quick brown fox jumps over the lazy dog</p>
        <p class="type-meta">Tiny - 12px - 500</p>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">Buttons</h3>
      <div class="button-showcase">
        <button class="btn btn-primary">Primary Button</button>
        <button class="btn btn-secondary">Secondary Button</button>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">Border Radius</h3>
      <div class="radius-showcase">
        <div class="radius-item">
          <div class="radius-box" style="border-radius: var(--radius-sm);"></div>
          <span>sm - 4px</span>
        </div>
        <div class="radius-item">
          <div class="radius-box" style="border-radius: var(--radius-md);"></div>
          <span>md - 8px</span>
        </div>
        <div class="radius-item">
          <div class="radius-box" style="border-radius: var(--radius-lg);"></div>
          <span>lg - 12px</span>
        </div>
        <div class="radius-item">
          <div class="radius-box" style="border-radius: var(--radius-xl);"></div>
          <span>xl - 16px</span>
        </div>
        <div class="radius-item">
          <div class="radius-box" style="border-radius: var(--radius-full);"></div>
          <span>full</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.design-showcase {
  padding: var(--space-4xl) var(--container-padding);
  max-width: var(--container-max);
  margin: 0 auto;
  background: var(--color-background);
}

.title {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3xl);
}

.section {
  margin-bottom: var(--space-3xl);
}

.section-title {
  font-family: var(--font-body);
  font-size: var(--text-h3);
  font-weight: var(--font-semibold);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-gray-700);
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--space-lg);
}

.color-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.color-swatch {
  width: 100%;
  height: 80px;
  border-radius: var(--radius-md);
}

.color-info {
  display: flex;
  flex-direction: column;
}

.color-name {
  font-size: var(--text-small);
  font-weight: var(--font-medium);
}

.color-value {
  font-size: var(--text-tiny);
  font-family: var(--font-mono);
  color: var(--color-text-muted);
}

.type-showcase {
  margin-bottom: var(--space-lg);
}

.type-sample {
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.type-sample.display {
  font-family: var(--font-heading);
  font-size: var(--text-display);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

.type-sample.h1 {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
}

.type-sample.h2 {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--font-semibold);
  line-height: 1.3;
}

.type-sample.h3 {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--font-medium);
  line-height: 1.4;
}

.type-sample.body-lg {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

.type-sample.body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.type-sample.small {
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.type-sample.tiny {
  font-family: var(--font-body);
  font-size: var(--text-tiny);
  font-weight: var(--font-medium);
  line-height: 1.4;
}

.type-meta {
  font-size: var(--text-tiny);
  font-family: var(--font-mono);
  color: var(--color-text-muted);
}

.button-showcase {
  display: flex;
  gap: var(--space-lg);
}

.btn {
  padding: var(--space-md) var(--space-xl);
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--font-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-default);
}

.btn-primary {
  background: var(--color-accent);
  color: #0A0A0B;
  border: none;
}

.btn-primary:hover {
  background: var(--color-accent-hover);
}

.btn-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}

.btn-secondary:hover {
  background: var(--color-accent-muted);
}

.radius-showcase {
  display: flex;
  gap: var(--space-xl);
  align-items: flex-end;
}

.radius-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.radius-box {
  width: 60px;
  height: 60px;
  background: var(--color-accent);
}

.radius-item span {
  font-size: var(--text-tiny);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}
</style>