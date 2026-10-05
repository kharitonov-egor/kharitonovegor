import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react'
import me from '../assets/me.webp'
import { profile } from '../data/profile'
import { useLocalize } from '../i18n/lang'
import { useReducedMotion } from '../lib/useReducedMotion'

const STRAP_VH = 55
const STRAP = `${STRAP_VH}vh`
const MAX_ANGLE = 45
const MAX_SPIN = 200
const MAX_WIND_SPIN = 40
const SWING_STIFFNESS = 28
const SWING_DAMPING = 1.4
const BOUNCE_STIFFNESS = 220
const BOUNCE_DAMPING = 14
const WIND = 2.5
const TILT_EASE = 0.14
const TAP_SPIN = 80
const RAD_TO_DEG = 180 / Math.PI

type Drag = {
  x: number
  y: number
  angle: number
  pivotX: number
  pivotY: number
  grabPhi: number
  moved: boolean
  lastAngle: number
  lastTime: number
}

type Motion = {
  angle: number
  spin: number
  y: number
  vy: number
  tiltX: number
  tiltY: number
  targetX: number
  targetY: number
  drag: Drag | null
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export default function Badge() {
  const l = useLocalize()
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const swingRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const kick = useRef<() => void>(() => undefined)
  const motion = useRef<Motion>({
    angle: 0,
    spin: 0,
    y: 0,
    vy: 0,
    tiltX: 0,
    tiltY: 0,
    targetX: 0,
    targetY: 0,
    drag: null,
  })

  useEffect(() => {
    const swing = swingRef.current
    const card = cardRef.current
    if (!swing || !card) return
    const m = motion.current

    const render = () => {
      swing.style.transform = `translateY(${m.y}px) rotate(${m.angle}deg)`
      card.style.transform = `perspective(800px) rotateX(${m.tiltX}deg) rotateY(${m.tiltY + clamp(m.spin * 0.06, -22, 22)}deg)`
    }

    if (reduced) {
      Object.assign(m, { angle: 0, spin: 0, y: 0, vy: 0, tiltX: 0, tiltY: 0, targetX: 0, targetY: 0, drag: null })
      render()
      return
    }

    let last = performance.now()

    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000)
      last = now
      if (!m.drag) {
        m.spin += (-SWING_STIFFNESS * m.angle - SWING_DAMPING * m.spin) * dt
        m.angle += m.spin * dt
        m.vy += (-BOUNCE_STIFFNESS * m.y - BOUNCE_DAMPING * m.vy) * dt
        m.y += m.vy * dt
      }
      m.tiltX += (m.targetX - m.tiltX) * TILT_EASE
      m.tiltY += (m.targetY - m.tiltY) * TILT_EASE
      render()

      const settled =
        !m.drag &&
        Math.abs(m.angle) < 0.02 &&
        Math.abs(m.spin) < 0.05 &&
        Math.abs(m.y) < 0.05 &&
        Math.abs(m.vy) < 0.05 &&
        Math.abs(m.targetX - m.tiltX) < 0.02 &&
        Math.abs(m.targetY - m.tiltY) < 0.02
      frame.current = settled ? 0 : requestAnimationFrame(step)
    }

    kick.current = () => {
      if (frame.current) return
      last = performance.now()
      frame.current = requestAnimationFrame(step)
    }

    let lastX = 0
    let lastTime = 0
    const onWind = (e: globalThis.PointerEvent) => {
      if (e.pointerType !== 'mouse' || m.drag) return
      const now = performance.now()
      const vx = lastTime ? (e.clientX - lastX) / Math.max(1, now - lastTime) : 0
      lastX = e.clientX
      lastTime = now
      const rect = card.getBoundingClientRect()
      const near =
        e.clientX > rect.left - 40 && e.clientX < rect.right + 40 && e.clientY > rect.top - 40 && e.clientY < rect.bottom + 40
      if (!near || Math.abs(vx) < 0.3) return
      m.spin = clamp(m.spin - vx * WIND, -MAX_WIND_SPIN, MAX_WIND_SPIN)
      kick.current()
    }

    window.addEventListener('pointermove', onWind)
    render()
    return () => {
      window.removeEventListener('pointermove', onWind)
      cancelAnimationFrame(frame.current)
      frame.current = 0
      kick.current = () => undefined
    }
  }, [reduced])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current
    if (reduced || !root || (e.pointerType === 'mouse' && e.button !== 0)) return
    const m = motion.current
    e.currentTarget.setPointerCapture(e.pointerId)
    const rect = root.getBoundingClientRect()
    const pivotX = rect.left + rect.width / 2
    const pivotY = rect.top - (window.innerHeight * STRAP_VH) / 100
    m.drag = {
      x: e.clientX,
      y: e.clientY,
      angle: m.angle,
      pivotX,
      pivotY,
      grabPhi: Math.atan2(e.clientX - pivotX, e.clientY - pivotY) * RAD_TO_DEG,
      moved: false,
      lastAngle: m.angle,
      lastTime: performance.now(),
    }
    m.spin = 0
    m.vy = 0
    m.targetX = 0
    m.targetY = 0
    kick.current()
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const m = motion.current
    const card = cardRef.current
    if (reduced || !card) return

    if (m.drag) {
      const now = performance.now()
      const dx = e.clientX - m.drag.x
      const dy = e.clientY - m.drag.y
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) m.drag.moved = true
      const phi = Math.atan2(e.clientX - m.drag.pivotX, e.clientY - m.drag.pivotY) * RAD_TO_DEG
      const next = clamp(m.drag.angle - (phi - m.drag.grabPhi), -MAX_ANGLE, MAX_ANGLE)
      const velocity = (next - m.drag.lastAngle) / (Math.max(1, now - m.drag.lastTime) / 1000)
      m.spin = clamp(m.spin * 0.5 + velocity * 0.5, -MAX_SPIN, MAX_SPIN)
      m.drag.lastAngle = next
      m.drag.lastTime = now
      m.angle = next
      m.y = dy > 0 ? Math.min(70, dy * 0.45) : Math.max(-24, dy * 0.25)
      kick.current()
      return
    }

    if (e.pointerType !== 'mouse') return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    m.targetX = (py - 0.5) * -18
    m.targetY = (px - 0.5) * 22
    card.style.setProperty('--gx', `${px * 100}%`)
    card.style.setProperty('--gy', `${py * 100}%`)
    kick.current()
  }

  const onRelease = () => {
    const m = motion.current
    if (!m.drag) return
    if (!m.drag.moved) m.spin = Math.random() < 0.5 ? TAP_SPIN : -TAP_SPIN
    else if (performance.now() - m.drag.lastTime > 80) m.spin = 0
    m.drag = null
    kick.current()
  }

  const onPointerLeave = () => {
    const m = motion.current
    m.targetX = 0
    m.targetY = 0
    kick.current()
  }

  const swingStyle: CSSProperties = { transformOrigin: `50% -${STRAP}` }

  return (
    <div ref={rootRef} className="relative mx-auto w-[212px] cursor-grab touch-pan-y select-none active:cursor-grabbing print:hidden">
      <div
        ref={swingRef}
        className="will-change-transform"
        style={swingStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onRelease}
        onPointerCancel={onRelease}
        onPointerLeave={onPointerLeave}
      >
        <div
          aria-hidden="true"
          className="absolute bottom-full left-1/2 flex w-[18px] -translate-x-1/2 justify-end overflow-hidden whitespace-nowrap bg-accent font-sans text-[8px] font-bold tracking-[0.3em] text-bg [writing-mode:vertical-rl]"
          style={{ height: STRAP }}
        >
          {Array.from({ length: 16 }, () => 'TECHX FLORIDA').join(' · ')}
        </div>
        <div aria-hidden="true" className="relative mx-auto h-6 w-10 rounded-b-md rounded-t-sm border border-line bg-[#2b2a28]">
          <div className="absolute inset-x-2 bottom-1 h-1 rounded-full bg-bg" />
        </div>
        <div
          ref={cardRef}
          className="group/card relative -mt-1 rounded-2xl border border-line bg-card p-3.5 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.9)] will-change-transform"
        >
          <div className="mx-auto mb-3.5 h-1.5 w-12 rounded-full bg-bg" />
          <img
            src={me}
            alt={l(profile.name)}
            draggable={false}
            className="aspect-square w-full rounded-xl object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--gx, 50%) var(--gy, 30%), rgba(255, 255, 255, 0.16), transparent 55%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
