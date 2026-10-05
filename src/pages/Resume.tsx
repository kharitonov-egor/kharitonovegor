import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { experience, type Role } from '../data/Experience'
import { leadership } from '../data/Leadership'
import { orgs } from '../data/orgs'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { stack } from '../data/Stack'
import { useLocalize } from '../i18n/lang'
import { formatMonth } from '../lib/format'
import { useTitle } from '../lib/useTitle'

const SECTION = 'mt-6 border-b border-[#1b1b1b]/25 pb-1 text-[11px] font-bold uppercase tracking-[0.18em]'

function dates(role: Role) {
  return `${formatMonth(role.start, 'en')} – ${role.end ? formatMonth(role.end, 'en') : 'Present'}`
}

function RoleBlock({ role }: { role: Role }) {
  return (
    <div className="mt-3 break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <p>
          <span className="font-bold">{role.title.en}</span>, {orgs[role.org].name}
        </p>
        <p className="text-[13px] italic">{dates(role)}</p>
      </div>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 [&_a]:underline [&_strong]:font-semibold">
        {role.descriptions.en.map((description, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: description }} />
        ))}
      </ul>
    </div>
  )
}

function hasPrintFlag(state: unknown): boolean {
  return typeof state === 'object' && state !== null && 'print' in state && state.print === true
}

export default function Resume() {
  const location = useLocation()
  const navigate = useNavigate()
  const posthog = usePostHog()
  const l = useLocalize()
  const shouldPrint = hasPrintFlag(location.state)
  useTitle('Résumé')

  useEffect(() => {
    if (!shouldPrint) return
    const id = window.setTimeout(() => {
      posthog?.capture('resume_print')
      window.print()
      navigate(location.pathname, { replace: true, state: null })
    }, 400)
    return () => window.clearTimeout(id)
  }, [location.pathname, navigate, posthog, shouldPrint])

  const contacts = [
    profile.location.en,
    profile.email,
    profile.site.replace('https://www.', ''),
    profile.linkedinUrl.replace('https://www.', '').replace(/\/$/, ''),
    profile.githubUrl.replace('https://', ''),
  ]

  return (
    <div className="pt-6 sm:pt-10 print:pt-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">$</span> lpr resume.pdf
        </p>
        <button
          type="button"
          onClick={() => {
            posthog?.capture('resume_print')
            window.print()
          }}
          className="rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-semibold text-[#111]"
        >
          {l({ en: 'Print / save as PDF', ru: 'Печать / сохранить в PDF' })}
        </button>
      </div>

      <article className="rounded-sm bg-[#fbfaf7] px-6 py-8 font-serif text-[14px] leading-snug text-[#1b1b1b] shadow-2xl sm:px-10 sm:py-10 print:bg-white print:p-0 print:shadow-none">
        <header className="text-center">
          <h1 className="text-[28px] font-bold tracking-tight">{profile.name.en}</h1>
          <p className="mt-1 text-[13px]">{contacts.join('  ·  ')}</p>
        </header>

        <h2 className={SECTION}>Education</h2>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4">
          <p>
            <span className="font-bold">{profile.education.school}</span>, Tampa, FL
          </p>
        </div>
        <p className="italic">{profile.education.program.en}</p>

        <h2 className={SECTION}>Experience</h2>
        {experience.map((role) => (
          <RoleBlock key={role.id} role={role} />
        ))}

        <h2 className={SECTION}>Leadership</h2>
        {leadership.map((role) => (
          <RoleBlock key={role.id} role={role} />
        ))}

        <h2 className={SECTION}>Projects</h2>
        <ul className="mt-2 space-y-1">
          {projects.map((project) => (
            <li key={project.id} className="break-inside-avoid">
              <span className="font-bold">{project.title}</span>
              <span className="text-[13px] italic"> ({project.tags.join(', ')})</span>. {project.blurb.en}
            </li>
          ))}
        </ul>

        <h2 className={SECTION}>Skills</h2>
        <ul className="mt-2 space-y-0.5">
          {stack.map((group) => (
            <li key={group.label}>
              <span className="font-bold">{group.label}:</span> {group.items.join(', ')}
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}
