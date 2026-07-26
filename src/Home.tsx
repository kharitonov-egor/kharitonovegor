import { useEffect, useState, type ReactNode } from 'react'
import GithubGraph from './GithubGraph'
import { experience } from './data/Experience'
import { leadership } from './data/Leadership'
import { openSource } from './data/OpenSource'
import me from './assets/me.png'

type Item = {
  title: string
  date: string
  organization: string
  logo: string
  descriptions: string[]
}

function useGutterCursor() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const root = document.documentElement
      root.style.setProperty('--mx', String(event.clientX))
      root.style.setProperty('--my', String(event.clientY))
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}

function Box({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <section className="box">
      {title && (
        <h2 className="section-heading mb-6">{title}</h2>
      )}
      {children}
    </section>
  )
}

function TimelineItem({
  item,
  showDetails = false,
}: {
  item: Item
  showDetails?: boolean
}) {
  const live = /present/i.test(item.date)

  return (
    <li className="tl-item">
      <div className="tl-marker">
        <span className={`tl-dot ${live ? 'tl-dot--live' : ''}`} />
      </div>
      <div className="cell boxy-hover p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p
              className="mt-1 text-sm text-neutral-500"
              dangerouslySetInnerHTML={{ __html: item.organization }}
            />
          </div>
          <span className="coord flex-none text-neutral-500">{item.date}</span>
        </div>
        {showDetails && (
          <ul className="mt-3 flex flex-col gap-2">
            {item.descriptions.map((description, i) => (
              <li
                key={i}
                className="text-sm leading-relaxed text-neutral-400 [&_a]:underline [&_strong]:text-neutral-200"
                dangerouslySetInnerHTML={{
                  __html: description.replace(/^•\s*/, ''),
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

type Contribution = {
  date: string
  count: number
  level: number
}

type ContributionResponse = {
  contributions?: Contribution[]
  total?: { lastYear?: number }
}

function buildContributionCalendar(contributions: Contribution[]) {
  if (!contributions.length) return { cells: [], months: [], weekCount: 0 }

  const firstDate = new Date(`${contributions[0].date}T00:00:00Z`)
  const cells: Array<Contribution | null> = [
    ...Array.from({ length: firstDate.getUTCDay() }, () => null),
    ...contributions,
  ]

  while (cells.length % 7 !== 0) cells.push(null)

  const weekCount = cells.length / 7
  const months = Array.from({ length: weekCount }, (_, weekIndex) => {
    const week = cells.slice(weekIndex * 7, weekIndex * 7 + 7)
    const firstContribution = week.find((cell): cell is Contribution => cell !== null)
    if (!firstContribution) return ''

    const currentMonth = new Date(`${firstContribution.date}T00:00:00Z`).getUTCMonth()
    const previousWeek = cells.slice(Math.max(0, weekIndex - 1) * 7, weekIndex * 7)
    const previousContribution = previousWeek.find((cell): cell is Contribution => cell !== null)
    const previousMonth = previousContribution
      ? new Date(`${previousContribution.date}T00:00:00Z`).getUTCMonth()
      : -1

    return weekIndex === 0 || currentMonth !== previousMonth
      ? new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(
          new Date(`${firstContribution.date}T00:00:00Z`),
        )
      : ''
  })

  return { cells, months, weekCount }
}

export function LegacyGithubGraph() {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let active = true

    fetch('https://github-contributions-api.jogruber.de/v4/kharitonov-egor?y=last')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load GitHub activity')
        return response.json() as Promise<ContributionResponse>
      })
      .then((data) => {
        if (!active || !data.contributions?.length) return
        setContributions(data.contributions)
        setTotal(
          data.total?.lastYear
          ?? data.contributions.reduce((sum, contribution) => sum + contribution.count, 0),
        )
        setStatus('ready')
      })
      .catch(() => {
        if (active) setStatus('error')
      })

    return () => { active = false }
  }, [])

  const calendar = buildContributionCalendar(contributions)
  const activeDays = contributions.filter((contribution) => contribution.count > 0).length

  return (
    <div className="github-graph cell" aria-label="GitHub contribution activity">
      <div className="github-graph__header">
        <div className="github-graph__identity">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 .7A11.5 11.5 0 0 0 8.4 23c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C16.9 4.7 18 5 18 5c.6 1.5.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.5 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .7Z" />
          </svg>
          <div>
            <p className="github-graph__eyebrow">GitHub activity</p>
            <p className="github-graph__username">@kharitonov-egor</p>
          </div>
        </div>
        <a
          className="graph-link"
          href="https://github.com/kharitonov-egor"
          target="_blank"
          rel="noopener noreferrer"
        >
          View GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>

      {status === 'error' ? (
        <div className="github-graph__error">
          Contribution activity is temporarily unavailable.
        </div>
      ) : (
        <div className={`github-graph__calendar ${status === 'loading' ? 'is-loading' : ''}`}>
          <div className="github-graph__weekdays" aria-hidden="true">
            <span>Mon</span><span>Wed</span><span>Fri</span>
          </div>
          <div className="github-graph__plot">
            <div
              className="github-graph__months"
              style={{ gridTemplateColumns: `repeat(${calendar.weekCount || 53}, minmax(0, 1fr))` }}
              aria-hidden="true"
            >
              {(calendar.months.length ? calendar.months : Array.from({ length: 53 }, () => '')).map(
                (month, index) => <span key={index}>{month}</span>,
              )}
            </div>
            <div
              className="github-graph__grid"
              style={{ gridTemplateColumns: `repeat(${calendar.weekCount || 53}, minmax(0, 1fr))` }}
            >
              {(calendar.cells.length ? calendar.cells : Array.from({ length: 371 }, () => null)).map(
                (contribution, index) => (
                  <span
                    key={contribution?.date ?? index}
                    className={`github-graph__cell github-graph__cell--${contribution?.level ?? 0}`}
                    title={contribution
                      ? `${contribution.date}: ${contribution.count} contribution${contribution.count === 1 ? '' : 's'}`
                      : undefined}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      )}

      <div className="github-graph__footer">
        <span className="github-graph__summary">
          {status === 'ready'
            ? `${total.toLocaleString()} contributions · ${activeDays} active days`
            : status === 'loading' ? 'Loading contribution activity…' : 'Public GitHub profile'}
        </span>
        <div className="github-graph__legend" aria-label="Contribution intensity from less to more">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((value) => (
            <i key={value} className={`github-graph__cell github-graph__cell--${value}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  useGutterCursor()

  return (
    <>
      <div className="binary-gutter binary-gutter--left" aria-hidden="true" />
      <div className="binary-gutter binary-gutter--right" aria-hidden="true" />

      <div className="site-frame">
        <Box>
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Hi, I&apos;m Egor
              </h1>
              <p className="max-w-[52ch] text-base leading-relaxed text-neutral-400">
                TypeScript backend engineer.
              </p>
            </div>
            <div className="cell soft-media flex-none overflow-hidden">
              <img
                src={me}
                alt="Egor Kharitonov"
                className="h-[152px] w-[152px] object-cover"
              />
            </div>
          </div>

          <div className="mt-7 flex flex-row flex-wrap gap-x-6 gap-y-2 text-base">
            <a className="ilink" href="https://github.com/kharitonov-egor" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="ilink" href="https://www.linkedin.com/in/kharitonov-egor/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="ilink" href="mailto:egakhar@gmail.com">
              Email
            </a>
            <a className="ilink" href="https://t.me/kharitonov_egor" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </div>

        </Box>

        <Box title="Experience">
          <ul className="tl text-white">
            {experience.map((item, i) => (
              <TimelineItem key={i} item={item} />
            ))}
          </ul>
        </Box>

        <Box title="Leadership">
          <ul className="tl text-white">
            {leadership.map((item, i) => (
              <TimelineItem key={i} item={item} />
            ))}
          </ul>
        </Box>

        <Box title="Shipped">
          <div className="grid gap-3 sm:grid-cols-2">
            {openSource.map((item) => (
              <a
                key={item.repo}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shipped-card cell boxy-hover flex flex-col p-4"
              >
                <div className="flex flex-row items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-white">
                    {item.repo}
                  </span>
                  <span className="text-sm text-neutral-500">↗</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </Box>

        <Box>
          <GithubGraph />
        </Box>

        <Box title="Book a call">
          <div className="cell overflow-hidden">
            <iframe
              src="https://cal.com/egor-kharitonov-j6h556?embed=true&theme=dark"
              title="Book a call with Egor Kharitonov"
              className="h-[620px] w-full"
              loading="lazy"
            />
          </div>
        </Box>

        <footer className="box coord flex flex-row items-center justify-between text-neutral-500">
          <span>© {new Date().getFullYear()} Egor Kharitonov</span>
          <span>Tampa, FL</span>
        </footer>
      </div>
    </>
  )
}
