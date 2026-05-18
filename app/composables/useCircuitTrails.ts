import type { Ref } from 'vue'

interface PathPoint {
  x: number
  y: number
  cumDist: number
}

interface ActivePath {
  points: PathPoint[]
  totalLength: number
  progress: number
  speed: number
  dyingAlpha: number
}

type Dir = [number, number]

const CONFIG = {
  gridSize: 64,
  tailPixels: 100,
  maxPaths: 12,
  spawnInterval: 180,
  lineWidth: 1.5,
  headOpacity: 0.07,
  tailOpacity: 0.02,
  minSegments: 6,
  maxSegments: 14,
  drawDuration: 1,
  fadeSpeed: 3.5,
}

export function useCircuitTrails(canvasRef: Ref<HTMLCanvasElement | null>) {
  let ctx: CanvasRenderingContext2D | null = null
  let width = 0
  let height = 0
  let dpr = 1
  let paths: ActivePath[] = []
  let animId: number | null = null
  let spawnTimer: ReturnType<typeof setTimeout> | null = null
  let lastTime = 0
  let running = false

  function setup() {
    const canvas = canvasRef.value
    if (!canvas) return false
    const parent = canvas.parentElement!
    dpr = window.devicePixelRatio || 1
    width = parent.offsetWidth
    height = parent.offsetHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)
    return !!ctx
  }

  function handleResize() {
    if (!running) return
    setup()
  }

  function canMove(nx: number, ny: number, maxX: number, maxY: number) {
    return nx >= 0 && nx <= maxX && ny >= 0 && ny <= maxY
  }

  function generatePath(): ActivePath | null {
    const gs = CONFIG.gridSize
    const maxCol = Math.ceil(width / gs)
    const maxRow = Math.ceil(height / gs)
    const maxX = maxCol * gs
    const maxY = maxRow * gs

    const edge = Math.floor(Math.random() * 4)
    let x: number, y: number
    const col = Math.floor(Math.random() * (maxCol + 1))
    const row = Math.floor(Math.random() * (maxRow + 1))
    switch (edge) {
      case 0: x = col * gs; y = 0; break
      case 1: x = maxX; y = row * gs; break
      case 2: x = col * gs; y = maxY; break
      default: x = 0; y = row * gs; break
    }

    const points: PathPoint[] = [{ x, y, cumDist: 0 }]
    const visited = new Set<string>()
    visited.add(`${x},${y}`)

    const centerX = width / 2
    const centerY = height / 2
    const numSegments = CONFIG.minSegments + Math.floor(Math.random() * (CONFIG.maxSegments - CONFIG.minSegments + 1))

    const dirs: Dir[] = [
      [gs, 0],
      [0, gs],
      [-gs, 0],
      [0, -gs],
    ]

    let lastDir = -1

    for (let i = 0; i < numSegments; i++) {
      const prev = points[points.length - 1]
      if (!prev) break
      const cx = prev.x
      const cy = prev.y

      const weightResults: { idx: number; weight: number }[] = []
      for (let di = 0; di < dirs.length; di++) {
        if (lastDir !== -1 && di === (lastDir + 2) % 4) continue
        const d = dirs[di]
        if (!d) continue
        const [dx, dy] = d
        const nx = cx + dx
        const ny = cy + dy
        if (!canMove(nx, ny, maxX, maxY)) continue
        const key = `${nx},${ny}`
        if (visited.has(key)) continue
        const dist = Math.sqrt((nx - centerX) ** 2 + (ny - centerY) ** 2)
        weightResults.push({ idx: di, weight: 1 / (dist + 1) })
      }

      const total = weightResults.reduce((a, b) => a + b.weight, 0)
      if (total <= 0) break

      let r = Math.random() * total
      let chosen = 0
      for (let j = 0; j < weightResults.length; j++) {
        const wr = weightResults[j]
        if (!wr) continue
        r -= wr.weight
        if (r <= 0) { chosen = wr.idx; break }
      }

      const dir = dirs[chosen]
      if (!dir) break
      const [dx, dy] = dir
      const nx = cx + dx
      const ny = cy + dy
      const last = points[points.length - 1]
      if (!last) break
      visited.add(`${nx},${ny}`)
      points.push({ x: nx, y: ny, cumDist: last.cumDist + gs })
      lastDir = chosen
    }

    if (points.length < 2) return null

    const lastPoint = points[points.length - 1]
    if (!lastPoint) return null

    return {
      points,
      totalLength: lastPoint.cumDist,
      progress: -0.05,
      speed: 1 / CONFIG.drawDuration,
      dyingAlpha: 1,
    }
  }

  function drawPath(p: ActivePath) {
    if (!ctx) return

    const headPos = Math.min(p.progress * p.totalLength, p.totalLength)
    const tailPos = Math.max(0, headPos - CONFIG.tailPixels)
    if (headPos <= 0) return

    const points = p.points
    const da = p.dyingAlpha

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]
      const p1 = points[i + 1]
      if (!p0 || !p1) continue

      const segStartDist = p0.cumDist
      const segEndDist = p1.cumDist

      if (segEndDist <= tailPos || segStartDist >= headPos) continue

      const visStart = Math.max(segStartDist, tailPos)
      const visEnd = Math.min(segEndDist, headPos)
      const midDist = (visStart + visEnd) / 2
      const distFromHead = headPos - midDist
      const frac = Math.max(0, Math.min(1, distFromHead / CONFIG.tailPixels))
      const opacity = (CONFIG.headOpacity - (CONFIG.headOpacity - CONFIG.tailOpacity) * frac) * da

      if (opacity <= 0) continue

      const tS = (visStart - segStartDist) / (segEndDist - segStartDist)
      const tE = (visEnd - segStartDist) / (segEndDist - segStartDist)
      const sx = p0.x + (p1.x - p0.x) * tS
      const sy = p0.y + (p1.y - p0.y) * tS
      const ex = p0.x + (p1.x - p0.x) * tE
      const ey = p0.y + (p1.y - p0.y) * tE

      ctx.beginPath()
      ctx.moveTo(sx, sy)
      ctx.lineTo(ex, ey)
      ctx.strokeStyle = `rgba(255,255,255,${opacity.toFixed(4)})`
      ctx.lineWidth = CONFIG.lineWidth
      ctx.stroke()

      if (opacity > CONFIG.headOpacity * 0.5) {
        ctx.beginPath()
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${(opacity * 0.5).toFixed(4)})`
        ctx.fill()
      }
    }
  }

  function tick(time: number) {
    if (!running || !ctx) return

    const dt = lastTime ? (time - lastTime) / 1000 : 0.016
    lastTime = time

    ctx.clearRect(0, 0, width, height)

    for (let i = paths.length - 1; i >= 0; i--) {
      const p = paths[i]
      if (!p) continue

      if (p.progress < 1) {
        p.progress += p.speed * dt
        if (p.progress >= 1) {
          p.dyingAlpha = 1
        }
      } else {
        p.progress += p.speed * dt
        p.dyingAlpha -= dt * CONFIG.fadeSpeed
        if (p.dyingAlpha <= 0) {
          paths.splice(i, 1)
          continue
        }
      }
    }

    for (const p of paths) {
      if (p.progress < 0) continue
      drawPath(p)
    }

    animId = requestAnimationFrame(tick)
  }

  function spawn() {
    if (!running) return
    if (paths.length < CONFIG.maxPaths) {
      const p = generatePath()
      if (p) paths.push(p)
    }
    const delay = CONFIG.spawnInterval * (0.5 + Math.random())
    spawnTimer = setTimeout(spawn, delay)
  }

  function start() {
    if (running) return
    if (!setup()) return
    running = true
    paths = []
    lastTime = 0
    animId = requestAnimationFrame(tick)
    spawnTimer = setTimeout(spawn, 300)
    window.addEventListener('resize', handleResize)
  }

  function stop() {
    running = false
    if (animId !== null) { cancelAnimationFrame(animId); animId = null }
    if (spawnTimer !== null) { clearTimeout(spawnTimer); spawnTimer = null }
    window.removeEventListener('resize', handleResize)
    if (ctx) {
      ctx.clearRect(0, 0, width, height)
    }
  }

  return { start, stop }
}
