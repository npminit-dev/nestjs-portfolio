<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursor = ref<HTMLElement | null>(null)
const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const trail = ref<HTMLElement | null>(null)

let ticker: (() => void) | null = null
let firstMove = true
let isOverInteractive = false

onMounted(() => {
  if (!window.matchMedia('(pointer: fine)').matches) return

  document.body.style.cursor = 'none'

  const mouse = { x: -100, y: -100 }
  const ringPos = { x: -100, y: -100 }
  const trailPos = { x: -100, y: -100 }

  const handleMouse = (e: MouseEvent) => {
    if (firstMove) {
      firstMove = false
      gsap.to(cursor.value, { opacity: 1, duration: 0.6, ease: 'power2.out' })
    }
    mouse.x = e.clientX
    mouse.y = e.clientY
    gsap.set(dot.value, { x: mouse.x, y: mouse.y })
  }

  const handleLeave = () => { gsap.to(cursor.value, { opacity: 0, duration: 0.3 }) }
  const handleEnter = () => { if (!firstMove) gsap.to(cursor.value, { opacity: 1, duration: 0.3 }) }

  const scaleUp = () => {
    isOverInteractive = true
    gsap.to([dot.value, ring.value, trail.value], { scale: 1.5, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
  }
  const scaleDown = () => {
    isOverInteractive = false
    gsap.to([dot.value, ring.value, trail.value], { scale: 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
  }

  const overlap = '-=0.12'

  const handleMouseDown = () => {
    gsap.timeline({ defaults: { duration: 0.25, ease: 'power3.out', overwrite: 'auto' } })
      .to(trail.value, { scale: 0.8 })
      .to(ring.value, { scale: 0.8 }, overlap)
      .to(dot.value, { scale: 0.8 }, overlap)
  }

  const handleMouseUp = () => {
    const target = isOverInteractive ? 1.5 : 1
    gsap.timeline({ defaults: { duration: 0.25, ease: 'power3.out', overwrite: 'auto' } })
      .to(dot.value, { scale: target })
      .to(ring.value, { scale: target }, overlap)
      .to(trail.value, { scale: target }, overlap)
  }

  const interactives = document.querySelectorAll<HTMLElement>('a, button, [data-cursor]')
  interactives.forEach(el => {
    el.addEventListener('mouseenter', scaleUp)
    el.addEventListener('mouseleave', scaleDown)
  })

  ticker = () => {
    ringPos.x += (mouse.x - ringPos.x) * 0.12
    ringPos.y += (mouse.y - ringPos.y) * 0.12
    gsap.set(ring.value, { x: ringPos.x, y: ringPos.y })

    trailPos.x += (ringPos.x - trailPos.x) * 0.12
    trailPos.y += (ringPos.y - trailPos.y) * 0.12
    gsap.set(trail.value, { x: trailPos.x, y: trailPos.y })
  }
  gsap.ticker.add(ticker)

  window.addEventListener('mousemove', handleMouse)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  document.documentElement.addEventListener('mouseleave', handleLeave)
  document.documentElement.addEventListener('mouseenter', handleEnter)

  onUnmounted(() => {
    document.body.style.cursor = ''
    window.removeEventListener('mousemove', handleMouse)
    window.removeEventListener('mousedown', handleMouseDown)
    window.removeEventListener('mouseup', handleMouseUp)
    document.documentElement.removeEventListener('mouseleave', handleLeave)
    document.documentElement.removeEventListener('mouseenter', handleEnter)
    interactives.forEach(el => {
      el.removeEventListener('mouseenter', scaleUp)
      el.removeEventListener('mouseleave', scaleDown)
    })
    if (ticker) gsap.ticker.remove(ticker)
  })
})
</script>

<template>
  <div ref="cursor" class="custom-cursor" aria-hidden="true">
    <div ref="trail" class="cursor-trail"></div>
    <div ref="ring" class="cursor-ring"></div>
    <div ref="dot" class="cursor-dot"></div>
  </div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 99999;
  opacity: 0;
}

.cursor-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(245, 245, 245, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.cursor-ring {
  position: absolute;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  backdrop-filter: invert(1);
  -webkit-backdrop-filter: invert(1);
}

.cursor-trail {
  position: absolute;
  width: 68px;
  height: 68px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
