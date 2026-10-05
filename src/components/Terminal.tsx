import { usePostHog } from 'posthog-js/react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { experience } from '../data/Experience'
import { leadership } from '../data/Leadership'
import { nowItems } from '../data/now'
import { orgs } from '../data/orgs'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { techxStats } from '../data/techx'
import { useLang } from '../i18n/lang'
import { formatMonth, stripTags } from '../lib/format'
import { useCopyEmail } from '../lib/useCopyEmail'

type Line = { kind: 'in' | 'out' | 'err'; text: string }

const PROMPT = 'guest@egor:~$'

const PAGES: Record<string, string> = {
  home: '/',
  '~': '/',
  now: '/now',
  uses: '/uses',
  writing: '/writing',
  guestbook: '/guestbook',
  resume: '/resume',
  tutoring: '/tutoring',
  pipeline: '/projects/order-pipeline',
}

const LINKS: Record<string, string> = {
  github: profile.githubUrl,
  linkedin: profile.linkedinUrl,
  telegram: profile.telegramUrl,
  cal: profile.calUrl,
  techx: 'https://techxflorida.com/2025',
}

const roles = [...leadership, ...experience].sort((a, b) => b.start.localeCompare(a.start))

const FILES: Record<string, () => string> = {
  'about.md': () => `# ${profile.name.en}\n\n${profile.bio.en}`,
  'experience.md': () =>
    roles
      .map(
        (role) =>
          `## ${role.title.en}, ${orgs[role.org].name} (${formatMonth(role.start, 'en')} - ${role.end ? formatMonth(role.end, 'en') : 'now'})\n` +
          role.descriptions.en.map((d) => `- ${stripTags(d)}`).join('\n'),
      )
      .join('\n\n'),
  'projects.md': () => projects.map((p) => `- ${p.title}: ${p.blurb.en}\n  ${p.href}`).join('\n'),
  'now.md': () => nowItems.map((item) => `- ${item.en}`).join('\n'),
  'techx.md': () =>
    `TechX Florida 2025, Nov 8 at USF.\n${techxStats.attendees} attendees, ${techxStats.registrations} registrations, ${techxStats.talks} talks.\nhttps://techxflorida.com/2025/report`,
  'contact.md': () =>
    [
      `email     ${profile.email}`,
      `github    ${profile.githubUrl}`,
      `linkedin  ${profile.linkedinUrl}`,
      `telegram  ${profile.telegramUrl}`,
      `call      ${profile.calUrl}`,
    ].join('\n'),
  'resume.pdf': () => 'resume.pdf: binary file. Try `open resume`.',
}

const HELP = `Commands:
  help              this list
  whoami            who I am
  ls                list files
  cat <file>        print a file (try: cat about.md)
  open <target>     open a page or link: ${[...Object.keys(PAGES).filter((k) => k !== '~'), ...Object.keys(LINKS)].join(', ')}
  cd <page>         same as open, for pages
  email             copy my email address
  date              time in Tampa
  lang <en|ru>      switch site language
  history           previous commands
  clear             clear the screen
  exit              close the terminal`

const COMMANDS = ['help', 'whoami', 'ls', 'cat', 'open', 'cd', 'email', 'date', 'lang', 'history', 'clear', 'exit', 'echo', 'sudo']

const WELCOME: Line[] = [
  { kind: 'out', text: `Welcome. Type \`help\` to see what works. Press \` or Esc to close.` },
]

function complete(input: string): string {
  const parts = input.split(' ')
  if (parts.length === 1) {
    const match = COMMANDS.filter((c) => c.startsWith(parts[0]))
    return match.length === 1 ? `${match[0]} ` : input
  }
  const [cmd, arg = ''] = parts
  const pool = cmd === 'cat' ? Object.keys(FILES) : cmd === 'open' || cmd === 'cd' ? [...Object.keys(PAGES), ...Object.keys(LINKS)] : []
  const match = pool.filter((option) => option.startsWith(arg))
  return match.length === 1 ? `${cmd} ${match[0]}` : input
}

export default function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const { setLang } = useLang()
  const copyEmail = useCopyEmail()
  const posthog = usePostHog()
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)

  useEffect(() => {
    if (!open) return
    posthog?.capture('terminal_open')
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [open, posthog])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  if (!open) return null

  const execute = (raw: string): Line[] => {
    const [cmd = '', ...args] = raw.trim().split(/\s+/)
    const arg = args.join(' ')
    const out = (text: string): Line[] => [{ kind: 'out', text }]
    const err = (text: string): Line[] => [{ kind: 'err', text }]

    switch (cmd) {
      case '':
        return []
      case 'help':
        return out(HELP)
      case 'whoami':
        return out(`${profile.name.en}. ${profile.bio.en}`)
      case 'ls':
        return out(Object.keys(FILES).join('  '))
      case 'cat': {
        if (!arg) return err('usage: cat <file>')
        const file = FILES[arg]
        return file ? out(file()) : err(`cat: ${arg}: No such file or directory`)
      }
      case 'open':
      case 'cd': {
        const target = arg || '~'
        if (PAGES[target]) {
          navigate(PAGES[target], { viewTransition: true })
          onClose()
          return []
        }
        if (cmd === 'open' && LINKS[target]) {
          window.open(LINKS[target], '_blank', 'noopener,noreferrer')
          return out(`opening ${LINKS[target]}`)
        }
        return err(`${cmd}: ${target}: not found. Try \`help\`.`)
      }
      case 'email':
        void copyEmail()
        return out(`copied ${profile.email}`)
      case 'date':
        return out(
          new Intl.DateTimeFormat('en-US', { timeZone: profile.timeZone, dateStyle: 'full', timeStyle: 'short' }).format(new Date()) +
            ' (Tampa)',
        )
      case 'lang':
        if (arg !== 'en' && arg !== 'ru') return err('usage: lang <en|ru>')
        setLang(arg)
        return out(`language: ${arg}`)
      case 'history':
        return out(history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join('\n') || '(empty)')
      case 'echo':
        return out(arg)
      case 'sudo':
        return err('guest is not in the sudoers file. This incident will be reported.')
      case 'rm':
        return err('rm: nice try.')
      case 'exit':
        onClose()
        return []
      default:
        return err(`command not found: ${cmd}. Type \`help\`.`)
    }
  }

  const submit = () => {
    const command = input
    setInput('')
    setCursor(-1)
    if (command.trim()) setHistory((h) => [...h, command])
    if (command.trim() === 'clear') {
      setLines([])
      return
    }
    posthog?.capture('terminal_command', { command: command.trim().split(/\s+/)[0] })
    const result = execute(command)
    setLines((prev) => [...prev, { kind: 'in', text: command }, ...result])
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'Escape' || e.key === '`') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      setInput((value) => complete(value))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cursor === -1) return
      const next = cursor + 1
      if (next >= history.length) {
        setCursor(-1)
        setInput('')
      } else {
        setCursor(next)
        setInput(history[next])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
      className="fixed inset-x-0 top-0 z-[65] flex h-[60vh] animate-drop-down flex-col border-b border-accent/40 bg-[#0b0b0b]/[0.97] font-mono text-[13px] shadow-2xl backdrop-blur print:hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-muted">
        <span>egor@kharitonovegor.com: ~</span>
        <button type="button" onClick={onClose} className="hover:text-fg">
          [esc]
        </button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
        {lines.map((line, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap break-words font-mono ${line.kind === 'err' ? 'text-red-400' : line.kind === 'in' ? 'text-fg' : 'text-muted'}`}
          >
            {line.kind === 'in' && <span className="text-accent">{PROMPT} </span>}
            {line.text}
          </pre>
        ))}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-accent">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Command"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-fg caret-accent focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
