import type { ReactNode } from 'react'

type Props = {
  command: string
  title: string
  children?: ReactNode
}

export default function PageHeader({ command, title, children }: Props) {
  return (
    <header className="pt-6 sm:pt-10">
      <p className="font-mono text-xs text-muted print:hidden">
        <span className="text-accent">$</span> {command}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg">{title}</h1>
      {children && <div className="mt-3 text-[15px] leading-relaxed text-muted">{children}</div>}
    </header>
  )
}
