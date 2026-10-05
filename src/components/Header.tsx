import { Link, NavLink } from 'react-router-dom'
import { useLang } from '../i18n/lang'
import { useT } from '../i18n/ui'
import { navPages } from '../lib/pages'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)

export default function Header({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { lang, toggleLang } = useLang()
  const t = useT()

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/75 backdrop-blur-md [view-transition-name:site-header] print:hidden">
      <div className="mx-auto flex max-w-[42rem] items-center justify-between gap-4 px-5 py-3.5 font-mono text-sm">
        <Link to="/" viewTransition className="text-fg transition-colors hover:text-accent">
          ~/egor
        </Link>
        <nav className="flex items-center gap-4 sm:gap-5">
          <div className="hidden items-center gap-5 sm:flex">
            {navPages.map((page) => (
              <NavLink
                key={page.to}
                to={page.to}
                viewTransition
                className={({ isActive }) => `transition-colors hover:text-fg ${isActive ? 'text-accent' : 'text-muted'}`}
              >
                {t(page.key)}
              </NavLink>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleLang}
            className="text-xs text-muted transition-colors hover:text-fg"
            aria-label={lang === 'en' ? 'Переключить на русский' : 'Switch to English'}
          >
            <span className={lang === 'en' ? 'text-fg' : ''}>EN</span>
            <span className="px-1 text-line">/</span>
            <span className={lang === 'ru' ? 'text-fg' : ''}>RU</span>
          </button>
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label={t('openMenu')}
            className="rounded-md border border-line px-2 py-1 text-xs text-muted transition-colors hover:border-muted/50 hover:text-fg"
          >
            <span className="sm:hidden">{t('menu')}</span>
            <kbd className="hidden font-mono sm:inline">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
        </nav>
      </div>
    </header>
  )
}
