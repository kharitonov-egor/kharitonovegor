import PageHeader from '../components/PageHeader'
import { nowItems, nowUpdated } from '../data/now'
import { useLang, useLocalize } from '../i18n/lang'
import { useT } from '../i18n/ui'
import { formatMonth } from '../lib/format'
import { useTitle } from '../lib/useTitle'

export default function Now() {
  const { lang } = useLang()
  const l = useLocalize()
  const t = useT()
  useTitle(l({ en: 'Now', ru: 'Сейчас' }))

  return (
    <>
      <PageHeader command="cat now.md" title={l({ en: 'Now', ru: 'Сейчас' })}>
        {l({
          en: 'What I\'m focused on this month. ',
          ru: 'Чем я занят в этом месяце. ',
        })}
        <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="link text-fg">
          {l({ en: 'What is a now page?', ru: 'Что такое now-страница?' })}
        </a>
      </PageHeader>
      <ul className="mt-10 space-y-4">
        {nowItems.map((item, i) => (
          <li key={i} className="relative pl-6 text-[15px] leading-relaxed text-fg/90">
            <span className="absolute left-0 font-mono text-accent" aria-hidden="true">
              ›
            </span>
            {l(item)}
          </li>
        ))}
      </ul>
      <p className="mt-10 font-mono text-xs text-muted">
        {t('updated')} {formatMonth(nowUpdated, lang)}
      </p>
    </>
  )
}
