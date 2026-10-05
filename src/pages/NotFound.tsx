import { Link, useLocation } from 'react-router-dom'
import { useLocalize } from '../i18n/lang'
import { useT } from '../i18n/ui'
import { useTitle } from '../lib/useTitle'

export default function NotFound() {
  const { pathname } = useLocation()
  const l = useLocalize()
  const t = useT()
  useTitle('404')

  return (
    <div className="pt-16 sm:pt-24">
      <p className="font-mono text-7xl font-bold tracking-tighter text-accent">404</p>
      <pre className="mt-6 whitespace-pre-wrap break-words font-mono text-sm text-muted">
        <span className="text-accent">$</span> git checkout {pathname}
        {'\n'}
        <span className="text-red-400">error: pathspec &apos;{pathname}&apos; did not match any file(s) known to git</span>
      </pre>
      <p className="mt-8 text-[15px] text-fg/90">
        {l({ en: 'This page doesn\'t exist. ', ru: 'Такой страницы нет. ' })}
        <Link to="/" viewTransition className="link">
          {t('back')}
        </Link>
        {l({ en: ', or press Ctrl/Cmd+K to search.', ru: ' или нажмите Ctrl/Cmd+K для поиска.' })}
      </p>
    </div>
  )
}
