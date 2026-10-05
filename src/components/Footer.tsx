import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { useT } from '../i18n/ui'
import { footerPages } from '../lib/pages'

export default function Footer({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const t = useT()

  return (
    <footer className="mx-auto w-full max-w-[42rem] px-5 pb-10 pt-24 font-mono text-xs text-muted print:hidden">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-6">
        <span>© {new Date().getFullYear()} Egor Kharitonov</span>
        {footerPages.map((page) => (
          <Link key={page.to} to={page.to} viewTransition className="transition-colors hover:text-fg">
            {t(page.key)}
          </Link>
        ))}
        <a href={profile.sourceUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
          {t('navSource')}
        </a>
        <button type="button" onClick={onOpenTerminal} className="transition-colors hover:text-accent sm:ml-auto">
          {t('terminalHint')}
        </button>
      </div>
    </footer>
  )
}
