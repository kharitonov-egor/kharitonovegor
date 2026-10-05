import { usePostHog } from 'posthog-js/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { projects, type Project } from '../data/projects'
import { useLocalize } from '../i18n/lang'

function PipelineGlyph() {
  return (
    <div className="flex h-full items-center justify-center gap-3 px-6 font-mono text-xs text-muted">
      <div className="flex flex-col gap-1.5">
        {['PDF', 'XML', 'EMAIL'].map((format) => (
          <span key={format} className="rounded-md border border-line bg-card px-2 py-1 text-center">
            {format}
          </span>
        ))}
      </div>
      <span className="text-accent">→</span>
      <span className="rounded-md border border-accent/50 bg-accent/10 px-2.5 py-1 text-accent">LLM</span>
      <span className="text-accent">→</span>
      <span className="rounded-md border border-line bg-card px-2.5 py-1 text-fg">{'{ order }'}</span>
    </div>
  )
}

function CardLink({ project, className, children }: { project: Project; className: string; children: ReactNode }) {
  const posthog = usePostHog()
  const onClick = () => posthog?.capture('project_click', { project: project.id })

  if (project.internal) {
    return (
      <Link to={project.href} viewTransition className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children}
    </a>
  )
}

export default function ProjectList() {
  const l = useLocalize()

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {projects.map((project, i) => (
        <CardLink
          key={project.id}
          project={project}
          className={`group block overflow-hidden rounded-2xl border border-line bg-card/60 transition-colors hover:border-muted/40 ${i === 0 ? 'sm:col-span-2' : ''}`}
        >
          <div className={`overflow-hidden border-b border-line bg-bg ${i === 0 ? 'aspect-[16/5]' : 'aspect-[16/10]'} print:hidden`}>
            {project.image ? (
              <img
                src={project.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <PipelineGlyph />
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-fg transition-colors group-hover:text-accent">
              {project.title} {project.internal ? '→' : '↗'}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{l(project.blurb)}</p>
            <p className="mt-3 font-mono text-[11px] text-muted/80">{project.tags.join(' · ')}</p>
          </div>
        </CardLink>
      ))}
    </div>
  )
}
