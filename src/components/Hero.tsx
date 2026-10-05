import { usePostHog } from 'posthog-js/react'
import type { MouseEvent } from 'react'
import { profile, socials } from '../data/profile'
import { useLocalize } from '../i18n/lang'
import { useCopyEmail } from '../lib/useCopyEmail'
import Badge from './Badge'
import HeroBullets from './HeroBullets'

export default function Hero() {
  const l = useLocalize()
  const posthog = usePostHog()
  const copyEmail = useCopyEmail()

  const onSocialClick = (event: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    posthog?.capture(event)
    if (event === 'email_click') {
      e.preventDefault()
      void copyEmail()
    }
  }

  return (
    <section className="grid items-center gap-14 pt-8 sm:grid-cols-[1fr_auto] sm:gap-14 sm:pt-0">
      <div className="order-2 sm:order-1">
        <h1 className="text-[2.6rem] font-bold leading-tight tracking-tight text-fg">{l(profile.name)}</h1>
        <div className="mt-6">
          <HeroBullets />
        </div>
        <nav
          aria-label={l({ en: 'Contact', ru: 'Контакты' })}
          className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-base"
        >
          {socials.map(({ event, domId, label, href }) => (
            <a
              key={event}
              id={domId}
              href={href}
              target={event === 'email_click' ? undefined : '_blank'}
              rel="noopener noreferrer"
              onClick={onSocialClick(event)}
              className={`link ${event === 'call_click' ? 'text-accent' : 'text-fg'}`}
            >
              {l(label)}
            </a>
          ))}
        </nav>
        <p className="mt-4 hidden font-mono text-[11px] text-muted print:block">
          {profile.email} · {profile.site.replace('https://', '')}
        </p>
      </div>
      <div className="order-1 sm:order-2">
        <Badge />
      </div>
    </section>
  )
}
