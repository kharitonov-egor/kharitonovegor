import { useState, type CSSProperties } from 'react'
import { experience, type Lane, type Role } from '../data/Experience'
import { leadership } from '../data/Leadership'
import type { OrgId } from '../data/orgs'
import { profile } from '../data/profile'
import { useLang, useLocalize, type Localized } from '../i18n/lang'
import { useT } from '../i18n/ui'
import { formatMonth, shortHash } from '../lib/format'
import OrgPreview from './OrgPreview'

type Entry = {
  id: string
  lane: number
  laneName: Lane
  title: Localized
  org: OrgId
  start?: string
  end?: string | null
  ongoing: boolean
  descriptions: Localized<string[]>
}

const LANE_INDEX: Record<Lane, number> = { main: 0, work: 1, ieee: 2 }
const LANE_COLORS = ['rgb(var(--muted) / 0.6)', 'rgb(var(--fg) / 0.45)', 'rgb(var(--accent) / 0.8)']
const LANE_GAP = 14
const NODE_Y = 8
const FORK_H = 18
const GUTTER = 7 + LANE_GAP * 2 + 9

const laneX = (lane: number) => 7 + lane * LANE_GAP

function toEntry(role: Role): Entry {
  return {
    id: role.id,
    lane: LANE_INDEX[role.lane],
    laneName: role.lane,
    title: role.title,
    org: role.org,
    start: role.start,
    end: role.end,
    ongoing: role.end === null,
    descriptions: role.descriptions,
  }
}

const entries: Entry[] = [
  ...[...leadership, ...experience].sort((a, b) => b.start.localeCompare(a.start)).map(toEntry),
  {
    id: 'usf',
    lane: 0,
    laneName: 'main',
    title: profile.education.program,
    org: 'usf',
    ongoing: true,
    descriptions: { en: [], ru: [] },
  },
]

type LaneRange = { first: number; last: number; ongoing: boolean }

const ranges = new Map<number, LaneRange>()
entries.forEach((entry, row) => {
  const range = ranges.get(entry.lane)
  if (range) range.last = row
  else ranges.set(entry.lane, { first: row, last: row, ongoing: entry.ongoing })
})

function refsFor(row: number, entry: Entry): string | undefined {
  if (row === 0) return `HEAD -> ${entry.laneName}`
  if (ranges.get(entry.lane)?.first === row) return entry.laneName
  return undefined
}

function Graph({ row, entry }: { row: number; entry: Entry }) {
  const lines: { lane: number; style: CSSProperties }[] = []
  let fork: number | undefined

  ranges.forEach(({ first, last, ongoing }, lane) => {
    if (row > last || (row < first && !ongoing)) return
    const top = row === first && !ongoing ? NODE_Y : 0
    const style: CSSProperties = { left: laneX(lane), top, background: LANE_COLORS[lane] }
    if (row < last) style.bottom = 0
    else if (lane === 0) style.height = NODE_Y - top
    else {
      style.bottom = FORK_H
      fork = lane
    }
    lines.push({ lane, style })
  })

  const filled = row === 0 || (entry.ongoing && entry.lane !== 0)

  return (
    <div aria-hidden="true" className="relative shrink-0" style={{ width: GUTTER }}>
      {lines.map(({ lane, style }) => (
        <span key={lane} className="absolute w-[2px] -translate-x-1/2" style={style} />
      ))}
      {fork !== undefined && (
        <svg className="absolute bottom-0 left-0" width={GUTTER} height={FORK_H} fill="none">
          <path
            d={`M ${laneX(fork)} 0 C ${laneX(fork)} ${FORK_H * 0.6}, ${laneX(0)} ${FORK_H * 0.4}, ${laneX(0)} ${FORK_H}`}
            stroke={LANE_COLORS[fork]}
            strokeWidth={2}
          />
        </svg>
      )}
      <span
        className="absolute h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{
          left: laneX(entry.lane),
          top: NODE_Y,
          borderColor: filled ? 'rgb(var(--accent))' : LANE_COLORS[entry.lane],
          background: filled ? 'rgb(var(--accent))' : 'rgb(var(--bg))',
        }}
      />
    </div>
  )
}

function Row({ row, entry }: { row: number; entry: Entry }) {
  const { lang } = useLang()
  const l = useLocalize()
  const t = useT()
  const [open, setOpen] = useState(false)
  const descriptions = l(entry.descriptions)
  const refs = refsFor(row, entry)
  const dates = entry.start
    ? `${formatMonth(entry.start, lang)} – ${entry.end ? formatMonth(entry.end, lang) : t('now')}`
    : l({ en: 'in progress', ru: 'в процессе' })

  return (
    <li className="flex">
      <Graph row={row} entry={entry} />
      <div className={`min-w-0 flex-1 ${row === entries.length - 1 ? '' : 'pb-7'}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 font-mono text-xs leading-4 text-muted">
          <span>
            {shortHash(entry.id)}
            {refs && <span className="ml-2 text-accent">({refs})</span>}
          </span>
          <span>{dates}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[15px]">
          {descriptions.length > 0 ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="text-left font-medium text-fg transition-colors hover:text-accent"
            >
              {l(entry.title)}
              <span className="ml-1.5 font-mono text-xs text-muted print:hidden">[{open ? '-' : '+'}]</span>
            </button>
          ) : (
            <span className="font-medium text-fg">{l(entry.title)}</span>
          )}
          <span className="text-muted">·</span>
          <OrgPreview id={entry.org} />
        </div>
        {descriptions.length > 0 && (
          <ul className={`rich mt-3 space-y-2 text-sm leading-relaxed text-muted ${open ? 'animate-fade-up' : 'hidden print:block'}`}>
            {descriptions.map((description, i) => (
              <li
                key={i}
                className="relative pl-4 before:absolute before:left-0 before:text-accent/70 before:content-['›']"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export default function GitLog() {
  return (
    <ol>
      {entries.map((entry, row) => (
        <Row key={entry.id} row={row} entry={entry} />
      ))}
    </ol>
  )
}
