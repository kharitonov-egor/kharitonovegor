import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useLang, useLocalize, locale } from '../i18n/lang'

type Day = { date: string; count: number; level: number }
type Contributions = { total: number; days: Day[] }

const WEEKS = 26
const CACHE_KEY = `gh-contributions:${profile.githubUser}`
const LEVEL_CLASSES = ['bg-line', 'bg-accent/30', 'bg-accent/55', 'bg-accent/80', 'bg-accent']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isDay(value: unknown): value is Day {
  return isRecord(value) && typeof value.date === 'string' && typeof value.count === 'number' && typeof value.level === 'number'
}

function parse(value: unknown): Contributions | null {
  if (!isRecord(value) || !isRecord(value.total) || !Array.isArray(value.contributions)) return null
  const total = value.total.lastYear
  if (typeof total !== 'number') return null
  return { total, days: value.contributions.filter(isDay) }
}

async function load(): Promise<Contributions> {
  const cached = sessionStorage.getItem(CACHE_KEY)
  if (cached) {
    const parsed = parse(JSON.parse(cached))
    if (parsed) return parsed
  }
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${profile.githubUser}?y=last`)
  if (!res.ok) throw new Error(`GitHub contributions request failed: ${res.status}`)
  const json: unknown = await res.json()
  const parsed = parse(json)
  if (!parsed) throw new Error('Unexpected contributions response')
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(json))
  return parsed
}

function lastWeeks(days: Day[]): (Day | null)[] {
  const today = new Date().toISOString().slice(0, 10)
  const past = days.filter((day) => day.date <= today)
  const todayWeekday = new Date().getDay()
  const count = (WEEKS - 1) * 7 + todayWeekday + 1
  const slice = past.slice(-count)
  const padding: null[] = Array.from({ length: Math.max(0, count - slice.length) }, () => null)
  return [...padding, ...slice]
}

export default function GithubGraph() {
  const { lang } = useLang()
  const l = useLocalize()
  const [data, setData] = useState<Contributions | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    load()
      .then((result) => !cancelled && setData(result))
      .catch(() => !cancelled && setFailed(true))
    return () => {
      cancelled = true
    }
  }, [])

  const cells = data ? lastWeeks(data.days) : Array.from({ length: WEEKS * 7 }, () => null)
  const total = data ? new Intl.NumberFormat(locale(lang)).format(data.total) : '…'

  return (
    <div>
      <p className="font-mono text-xs text-muted">
        {failed
          ? l({ en: 'Contributions unavailable right now', ru: 'Статистика сейчас недоступна' })
          : l({ en: `${total} contributions in the last year`, ru: `${total} контрибьюшенов за год` })}
      </p>
      <div className="mt-3 grid grid-flow-col grid-rows-7 gap-[3px]" aria-hidden="true">
        {cells.map((day, i) => (
          <span
            key={day?.date ?? `empty-${i}`}
            title={day ? `${day.date}: ${day.count}` : undefined}
            className={`aspect-square rounded-[2px] ${day ? LEVEL_CLASSES[Math.min(4, Math.max(0, day.level))] : 'bg-line/50'}`}
          />
        ))}
      </div>
    </div>
  )
}
