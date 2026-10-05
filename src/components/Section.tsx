import type { ReactNode } from 'react'

type Props = {
  title: string
  command: string
  children: ReactNode
  className?: string
}

export default function Section({ title, command, children, className = '' }: Props) {
  return (
    <section className={`mt-20 ${className}`}>
      <h2 className="mb-6 flex flex-wrap items-baseline gap-x-3">
        <span className="text-sm font-semibold text-fg">{title}</span>
        <span className="font-mono text-xs text-muted" aria-hidden="true">
          <span className="text-accent">$</span> {command}
        </span>
      </h2>
      {children}
    </section>
  )
}
