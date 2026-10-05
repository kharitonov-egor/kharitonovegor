import PageHeader from '../components/PageHeader'
import { uses } from '../data/uses'
import { useLocalize } from '../i18n/lang'
import { useTitle } from '../lib/useTitle'

export default function Uses() {
  const l = useLocalize()
  useTitle(l({ en: 'Uses', ru: 'Сетап' }))

  return (
    <>
      <PageHeader command="cat uses.md" title={l({ en: 'Uses', ru: 'Сетап' })}>
        {l({
          en: 'The hardware, apps and services I use day to day.',
          ru: 'Железо, приложения и сервисы, которыми я пользуюсь каждый день.',
        })}
      </PageHeader>
      <div className="mt-10 space-y-10">
        {uses.map((group) => (
          <section key={group.label.en}>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{l(group.label)}</h2>
            <ul className="divide-y divide-line border-y border-line">
              {group.items.map((item) => (
                <li key={item.name} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="shrink-0 text-fg sm:w-56">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="link">
                        {item.name}
                      </a>
                    ) : (
                      item.name
                    )}
                  </span>
                  <span className="text-sm text-muted">{l(item.note)}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
