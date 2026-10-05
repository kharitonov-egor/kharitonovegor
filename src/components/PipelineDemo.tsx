import { useEffect, useReducer, useRef, useState } from 'react'
import { useLocalize } from '../i18n/lang'
import { useReducedMotion } from '../lib/useReducedMotion'

type Segment = string | { field: string; text: string }
type Step = { fields: string[]; json: string[] }
type SourceId = 'pdf' | 'xml' | 'email'
type Source = { id: SourceId; label: string; file: string; lines: Segment[][]; steps: Step[] }

function parseLine(line: string): Segment[] {
  const segments: Segment[] = []
  let last = 0
  for (const match of line.matchAll(/\[(\w+):([^\]]+)\]/g)) {
    const index = match.index ?? 0
    if (index > last) segments.push(line.slice(last, index))
    segments.push({ field: match[1], text: match[2] })
    last = index + match[0].length
  }
  if (last < line.length) segments.push(line.slice(last))
  return segments
}

function steps(po: string, date: string, shipTo: string, items: [string, number][], needBy: string): Step[] {
  const [first, second] = items
  return [
    { fields: ['po'], json: [`  "po_number": "${po}",`] },
    { fields: ['date'], json: [`  "order_date": "${date}",`] },
    { fields: ['ship'], json: [`  "ship_to": "${shipTo}",`] },
    { fields: ['sku1', 'qty1'], json: ['  "items": [', `    { "sku": "${first[0]}", "qty": ${first[1]} },`] },
    { fields: ['sku2', 'qty2'], json: [`    { "sku": "${second[0]}", "qty": ${second[1]} }`, '  ],'] },
    { fields: ['due'], json: [`  "need_by": "${needBy}"`] },
  ]
}

const SOURCES: Source[] = [
  {
    id: 'pdf',
    label: 'PDF',
    file: 'po_4500-1187.pdf',
    lines: [
      'ACME PROMO SUPPLY CO.',
      '1400 Harbor Blvd, Tampa FL',
      '',
      'PURCHASE ORDER  No. [po:4500-1187]',
      'Date: [date:03/14/2026]',
      'Ship to: [ship:Bayside Realty, Tampa FL]',
      '',
      'ITEM       DESCRIPTION        QTY',
      '[sku1:TS-2201]    Cotton tee, navy   [qty1:250]',
      '[sku2:MG-0310]    Mug, 11 oz         [qty2:120]',
      '',
      'Required by: [due:04/02/2026]',
    ].map(parseLine),
    steps: steps('4500-1187', '2026-03-14', 'Bayside Realty, Tampa FL', [['TS-2201', 250], ['MG-0310', 120]], '2026-04-02'),
  },
  {
    id: 'xml',
    label: 'XML',
    file: 'po_4500-1204.xml',
    lines: [
      '<?xml version="1.0"?>',
      '<PurchaseOrder>',
      '  <Number>[po:4500-1204]</Number>',
      '  <Date>[date:2026-03-15]</Date>',
      '  <ShipTo>[ship:Gulf Dental, Sarasota FL]</ShipTo>',
      '  <Line>',
      '    <Sku>[sku1:PN-0042]</Sku><Qty>[qty1:500]</Qty>',
      '  </Line>',
      '  <Line>',
      '    <Sku>[sku2:TB-1180]</Sku><Qty>[qty2:75]</Qty>',
      '  </Line>',
      '  <NeedBy>[due:2026-04-10]</NeedBy>',
      '</PurchaseOrder>',
    ].map(parseLine),
    steps: steps('4500-1204', '2026-03-15', 'Gulf Dental, Sarasota FL', [['PN-0042', 500], ['TB-1180', 75]], '2026-04-10'),
  },
  {
    id: 'email',
    label: 'Email',
    file: 'inbox/picnic-order.eml',
    lines: [
      'From: jen@example.com',
      'Date: [date:Mon, Mar 16, 2026]',
      'Subject: Picnic order ([po:PO 4500-1219])',
      '',
      'Hi! Could we get [qty1:300] of the koozies',
      '([sku1:KC-5510]) and [qty2:40] umbrellas',
      '([sku2:UM-2090])? Please ship to',
      '[ship:Bayside HOA, Clearwater FL].',
      'We need them by [due:April 18].',
      '',
      'Thanks, Jen',
    ].map(parseLine),
    steps: steps('4500-1219', '2026-03-16', 'Bayside HOA, Clearwater FL', [['KC-5510', 300], ['UM-2090', 40]], '2026-04-18'),
  },
]

type Phase = 'highlight' | 'type' | 'hold'
type State = { source: number; step: number; chars: number; phase: Phase }
type Action = { type: 'tick' } | { type: 'select'; source: number; complete: boolean }

const CHARS_PER_TICK = 3
const DELAYS: Record<Phase, number> = { highlight: 420, type: 16, hold: 2800 }

const stepText = (step: Step) => step.json.join('\n')

function start(source: number): State {
  return { source, step: 0, chars: 0, phase: 'highlight' }
}

function complete(source: number): State {
  return { source, step: SOURCES[source].steps.length, chars: 0, phase: 'hold' }
}

function reducer(state: State, action: Action): State {
  if (action.type === 'select') return action.complete ? complete(action.source) : start(action.source)
  const sourceSteps = SOURCES[state.source].steps
  if (state.phase === 'highlight') return { ...state, phase: 'type' }
  if (state.phase === 'hold') return start((state.source + 1) % SOURCES.length)
  const chars = state.chars + CHARS_PER_TICK
  if (chars < stepText(sourceSteps[state.step]).length) return { ...state, chars }
  const step = state.step + 1
  return step < sourceSteps.length ? { ...state, step, chars: 0, phase: 'highlight' } : complete(state.source)
}

function JsonLine({ text }: { text: string }) {
  const parts = text.split(/("(?:[^"\\]|\\.)*"?)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        if (part.startsWith('"')) {
          const isKey = /^\s*:/.test(parts[i + 1] ?? '')
          return (
            <span key={i} className={isKey ? 'text-fg' : 'text-accent'}>
              {part}
            </span>
          )
        }
        return part.split(/(\d+)/g).map((chunk, j) =>
          /^\d+$/.test(chunk) ? (
            <span key={`${i}-${j}`} className="text-accent">
              {chunk}
            </span>
          ) : (
            <span key={`${i}-${j}`} className="text-muted">
              {chunk}
            </span>
          ),
        )
      })}
    </>
  )
}

function XmlText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(<[^>]*>)/g).map((part, i) =>
        part.startsWith('<') ? (
          <span key={i} className="text-muted">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

const PANEL = 'rounded-xl border px-4 py-3 font-mono text-[10.5px] leading-[1.65] whitespace-pre'

export default function PipelineDemo() {
  const l = useLocalize()
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [state, dispatch] = useReducer(reducer, 0, (source: number) => (reduced ? complete(source) : start(source)))
  const running = visible && pageVisible && !reduced

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onChange = () => setPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => dispatch({ type: 'tick' }), DELAYS[state.phase])
    return () => window.clearTimeout(id)
  }, [running, state])

  const source = SOURCES[state.source]
  const current = state.phase === 'hold' ? undefined : source.steps[state.step]
  const done = new Set(source.steps.slice(0, state.step).flatMap((step) => step.fields))
  const active = new Set(current?.fields ?? [])
  const jsonLines = [
    '{',
    ...source.steps.slice(0, state.step).flatMap((step) => step.json),
    ...(current && state.phase === 'type' ? stepText(current).slice(0, state.chars).split('\n') : []),
  ]
  const isPaper = source.id === 'pdf'

  const fieldClass = (field: string) => {
    if (active.has(field)) return 'rounded-sm bg-accent text-[#111] ring-2 ring-accent'
    if (done.has(field)) return isPaper ? 'rounded-sm bg-accent/30 ring-2 ring-accent/30' : 'rounded-sm bg-accent/20 text-fg ring-2 ring-accent/20'
    return ''
  }

  const status =
    state.phase === 'hold'
      ? l({ en: '✓ same schema, every format', ru: '✓ одна схема для всех форматов' })
      : l({
          en: `extracting ${state.step}/${source.steps.length}`,
          ru: `извлекаю ${state.step}/${source.steps.length}`,
        })

  return (
    <div ref={rootRef}>
      <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs">
        <div className="flex gap-1" role="group" aria-label={l({ en: 'Input format', ru: 'Формат входа' })}>
          {SOURCES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={i === state.source}
              onClick={() => dispatch({ type: 'select', source: i, complete: reduced })}
              className={`rounded-md border px-2.5 py-1 transition-colors ${i === state.source ? 'border-accent/60 bg-accent/10 text-accent' : 'border-line text-muted hover:text-fg'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <span className="truncate text-muted" aria-live="off">
          {status}
        </span>
      </div>

      <p className="sr-only">
        {l({
          en: 'Animation: a purchase order arrives as a PDF, an XML file or an email, and each field is copied into the same JSON object.',
          ru: 'Анимация: заказ приходит в виде PDF, XML или письма, и каждое поле переносится в один и тот же JSON-объект.',
        })}
      </p>

      <div aria-hidden="true" className="grid gap-3 sm:grid-cols-[1fr_1.08fr]">
        <div className="min-w-0">
          <p className="mb-1.5 font-mono text-[11px] text-muted">{source.file}</p>
          <div
            className={`${PANEL} min-h-[16.5rem] overflow-hidden ${isPaper ? 'border-transparent bg-[#ebe7de] text-[#2a2824] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] sm:-rotate-[0.6deg]' : 'border-line bg-card text-fg/85'}`}
          >
            {source.lines.map((segments, i) => (
              <div key={`${source.id}-${i}`}>
                {segments.length === 0 && ' '}
                {segments.map((segment, j) =>
                  typeof segment === 'string' ? (
                    source.id === 'xml' ? (
                      <XmlText key={j} text={segment} />
                    ) : (
                      <span key={j}>{segment}</span>
                    )
                  ) : (
                    <span key={j} className={`transition-colors duration-200 ${fieldClass(segment.field)}`}>
                      {segment.text}
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <p className="mb-1.5 font-mono text-[11px] text-muted">order.json</p>
          <div className={`${PANEL} min-h-[16.5rem] overflow-hidden border-line bg-card`}>
            {jsonLines.map((line, i) => (
              <div key={i}>
                <JsonLine text={line} />
                {i === jsonLines.length - 1 && state.phase !== 'hold' && (
                  <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-accent" />
                )}
              </div>
            ))}
            <div className="text-muted">{'}'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
