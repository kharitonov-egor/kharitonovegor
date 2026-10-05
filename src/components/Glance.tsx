import { usePostHog } from 'posthog-js/react'
import { profile } from '../data/profile'
import { techxReportUrl, techxStats } from '../data/techx'
import { useLocalize } from '../i18n/lang'
import GithubGraph from './GithubGraph'

const TILE =
  'group rounded-2xl border border-line bg-card/60 p-4 transition-colors hover:border-muted/40 focus-visible:border-accent focus-visible:outline-none'

export default function Glance() {
  const l = useLocalize()
  const posthog = usePostHog()

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <a
        href={profile.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${TILE} col-span-2`}
        onClick={() => posthog?.capture('glance_github_click')}
      >
        <p className="mb-2 text-sm font-medium text-fg group-hover:text-accent">GitHub ↗</p>
        <GithubGraph />
      </a>
      <a
        href={techxReportUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={TILE}
        onClick={() => posthog?.capture('glance_techx_click')}
      >
        <p className="text-sm font-medium text-fg group-hover:text-accent">TechX 2025 ↗</p>
        <p className="mt-3 text-3xl font-bold tracking-tight text-fg">{techxStats.attendees}</p>
        <p className="font-mono text-xs text-muted">{l({ en: 'attendees', ru: 'участников' })}</p>
        <ul className="mt-3 space-y-0.5 font-mono text-xs text-muted">
          <li>{l({ en: `${techxStats.registrations} registrations`, ru: `${techxStats.registrations} регистраций` })}</li>
          <li>{l({ en: `${techxStats.talks} talks`, ru: `${techxStats.talks} докладов` })}</li>
        </ul>
      </a>
      <a
        href={profile.calUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${TILE} flex flex-col justify-between border-accent/30 bg-accent/[0.06] hover:border-accent/70`}
        onClick={() => posthog?.capture('glance_call_click')}
      >
        <p className="text-sm font-medium text-fg group-hover:text-accent">
          {l({ en: 'Book a call ↗', ru: 'Созвониться ↗' })}
        </p>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          {l({
            en: 'Pick a time that works for you on Cal.com.',
            ru: 'Выберите удобное время на Cal.com.',
          })}
        </p>
      </a>
    </div>
  )
}
