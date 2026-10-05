import { usePostHog } from 'posthog-js/react'
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useLocalize, type Localized } from '../i18n/lang'
import type { Command, CommandGroup } from '../lib/useCommands'

const GROUP_LABELS: Record<CommandGroup, Localized> = {
  pages: { en: 'Pages', ru: 'Страницы' },
  actions: { en: 'Actions', ru: 'Действия' },
  links: { en: 'Links', ru: 'Ссылки' },
}

type Props = {
  open: boolean
  onClose: () => void
  commands: Command[]
}

export default function CommandPalette({ open, onClose, commands }: Props) {
  const l = useLocalize()
  const posthog = usePostHog()
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.hint ?? ''} ${c.keywords}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    posthog?.capture('palette_open')
    const previous = document.activeElement
    const html = document.documentElement
    const overflow = html.style.overflow
    html.style.overflow = 'hidden'
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      html.style.overflow = overflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open, posthog])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, listId])

  if (!open) return null

  const run = (command: Command) => {
    posthog?.capture('palette_command', { command: command.id })
    onClose()
    command.run()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const command = results[active]
      if (command) run(command)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  let lastGroup: CommandGroup | undefined

  return (
    <div
      className="fixed inset-0 z-[65] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm print:hidden"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={l({ en: 'Command menu', ru: 'Меню команд' })}
        className="w-full max-w-lg animate-fade-up overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span className="font-mono text-sm text-accent" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            placeholder={l({ en: 'Type a command or search', ru: 'Команда или поиск' })}
            className="h-12 w-full bg-transparent text-sm text-fg placeholder:text-muted focus:outline-none"
          />
          <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">esc</kbd>
        </div>
        <ul id={listId} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted">
              {l({ en: 'Nothing found', ru: 'Ничего не найдено' })}
            </li>
          )}
          {results.map((command, i) => {
            const header = command.group !== lastGroup ? command.group : undefined
            lastGroup = command.group
            return (
              <li key={command.id} role="presentation">
                {header && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                    {l(GROUP_LABELS[header])}
                  </p>
                )}
                <div
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(command)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm ${i === active ? 'bg-accent/10 text-accent' : 'text-fg'}`}
                >
                  <span>{command.label}</span>
                  {command.hint && <span className="truncate font-mono text-[11px] text-muted">{command.hint}</span>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
