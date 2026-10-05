import type { RealtimeChannel } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../i18n/lang'
import { getSupabase } from '../lib/supabase'

type Cursor = { id: string; x: number; y: number; path: string; color: string; seen: number }
type CursorPayload = Omit<Cursor, 'seen'>

const COLORS = ['#ff8a3d', '#7fb2f4', '#a3e635', '#f472b6', '#facc15', '#34d399']
const SEND_EVERY_MS = 50
const STALE_AFTER_MS = 8000
const RU_PEOPLE: Partial<Record<Intl.LDMLPluralRule, string>> = { one: 'человек', few: 'человека', many: 'человек' }

function isCursorPayload(value: unknown): value is CursorPayload {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.x === 'number' &&
    typeof v.y === 'number' &&
    typeof v.path === 'string' &&
    typeof v.color === 'string'
  )
}

function Arrow({ color }: { color: string }) {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <path d="M1 1l5.5 15 2.2-6.3L15 7.5z" fill={color} stroke="#111" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

export default function LiveCursors() {
  const { pathname } = useLocation()
  const { lang } = useLang()
  const [cursors, setCursors] = useState<Record<string, Cursor>>({})
  const [others, setOthers] = useState(0)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const [selfState] = useState(() => ({
    id: crypto.randomUUID(),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }))
  const self = useRef(selfState)
  const pathRef = useRef(pathname)

  useEffect(() => {
    pathRef.current = pathname
  }, [pathname])

  useEffect(() => {
    let cancelled = false
    let channel: RealtimeChannel | null = null

    getSupabase()
      .then((supabase) => {
        if (cancelled) return
        channel = supabase.channel('cursors', {
          config: { broadcast: { self: false }, presence: { key: self.current.id } },
        })
        channel
          .on('broadcast', { event: 'move' }, ({ payload }) => {
            if (!isCursorPayload(payload)) return
            setCursors((prev) => ({ ...prev, [payload.id]: { ...payload, seen: Date.now() } }))
          })
          .on('presence', { event: 'sync' }, () => {
            if (!channel) return
            const ids = Object.keys(channel.presenceState())
            setOthers(ids.filter((id) => id !== self.current.id).length)
            setCursors((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => ids.includes(id))))
          })
          .subscribe((status) => {
            if (status !== 'SUBSCRIBED' || !channel) return
            channelRef.current = channel
            void channel.track({ online_at: new Date().toISOString() })
          })
      })
      .catch(() => undefined)

    return () => {
      cancelled = true
      channelRef.current = null
      if (channel) void channel.unsubscribe()
    }
  }, [])

  useEffect(() => {
    let last = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const now = Date.now()
      if (now - last < SEND_EVERY_MS) return
      last = now
      const payload: CursorPayload = {
        id: self.current.id,
        color: self.current.color,
        path: pathRef.current,
        x: Math.round(e.pageX - window.innerWidth / 2),
        y: Math.round(e.pageY),
      }
      void channelRef.current?.send({ type: 'broadcast', event: 'move', payload })
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      const cutoff = Date.now() - STALE_AFTER_MS
      setCursors((prev) => {
        const fresh = Object.entries(prev).filter(([, cursor]) => cursor.seen > cutoff)
        return fresh.length === Object.keys(prev).length ? prev : Object.fromEntries(fresh)
      })
    }, 2000)
    return () => window.clearInterval(id)
  }, [])

  const visible = Object.values(cursors).filter((cursor) => cursor.path === pathname)
  const label =
    lang === 'ru'
      ? `ещё ${others} ${RU_PEOPLE[new Intl.PluralRules('ru').select(others)] ?? 'человек'} на сайте`
      : `${others} other ${others === 1 ? 'person' : 'people'} here now`

  return (
    <div className="print:hidden">
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-[55] h-0 w-full">
        {visible.map((cursor) => (
          <div
            key={cursor.id}
            className="absolute left-1/2 top-0 transition-transform duration-100 ease-linear"
            style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
          >
            <Arrow color={cursor.color} />
          </div>
        ))}
      </div>
      {others > 0 && (
        <div className="fixed bottom-4 left-4 z-[55] flex animate-fade-up items-center gap-2 rounded-full border border-line bg-card/90 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {label}
        </div>
      )}
    </div>
  )
}
