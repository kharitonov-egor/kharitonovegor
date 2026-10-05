import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile } from '../data/profile'
import { useLang, useLocalize } from '../i18n/lang'
import { useT } from '../i18n/ui'
import { footerPages, navPages } from './pages'
import { useCopyEmail } from './useCopyEmail'

export type CommandGroup = 'pages' | 'actions' | 'links'

export type Command = {
  id: string
  group: CommandGroup
  label: string
  hint?: string
  keywords: string
  run: () => void
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export function useCommands(openTerminal: () => void): Command[] {
  const navigate = useNavigate()
  const { toggleLang } = useLang()
  const l = useLocalize()
  const t = useT()
  const copyEmail = useCopyEmail()

  return useMemo(() => {
    const go = (to: string, state?: unknown) => () => navigate(to, { viewTransition: true, state })
    const open = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer')

    const pages: Command[] = [
      { id: 'home', group: 'pages', label: capitalize(t('home')), hint: '/', keywords: 'home index main главная', run: go('/') },
      ...[...navPages, ...footerPages].map(
        (page): Command => ({
          id: page.to,
          group: 'pages',
          label: capitalize(t(page.key)),
          hint: page.to,
          keywords: `${page.to} ${page.key}`,
          run: go(page.to),
        }),
      ),
      {
        id: 'case-study',
        group: 'pages',
        label: l({ en: 'Order pipeline case study', ru: 'Кейс: пайплайн заказов' }),
        hint: '/projects/order-pipeline',
        keywords: 'project pipeline stablein case study пайплайн',
        run: go('/projects/order-pipeline'),
      },
    ]

    const actions: Command[] = [
      {
        id: 'copy-email',
        group: 'actions',
        label: l({ en: 'Copy email address', ru: 'Скопировать почту' }),
        hint: profile.email,
        keywords: 'email mail contact почта',
        run: () => void copyEmail(),
      },
      {
        id: 'print-resume',
        group: 'actions',
        label: l({ en: 'Print résumé', ru: 'Распечатать резюме' }),
        hint: 'pdf',
        keywords: 'resume cv print pdf резюме',
        run: go('/resume', { print: true }),
      },
      {
        id: 'toggle-lang',
        group: 'actions',
        label: l({ en: 'Переключить на русский', ru: 'Switch to English' }),
        hint: 'EN / RU',
        keywords: 'language lang russian english язык',
        run: toggleLang,
      },
      {
        id: 'terminal',
        group: 'actions',
        label: l({ en: 'Open terminal', ru: 'Открыть терминал' }),
        hint: '`',
        keywords: 'terminal shell console cli терминал',
        run: openTerminal,
      },
    ]

    const links: Command[] = [
      { id: 'call', group: 'links', label: t('bookCall'), hint: 'cal.com', keywords: 'call meeting cal созвон', run: open(profile.calUrl) },
      { id: 'github', group: 'links', label: 'GitHub', hint: profile.githubUser, keywords: 'github code', run: open(profile.githubUrl) },
      { id: 'linkedin', group: 'links', label: 'LinkedIn', hint: 'kharitonov-egor', keywords: 'linkedin', run: open(profile.linkedinUrl) },
      { id: 'telegram', group: 'links', label: 'Telegram', hint: '@kharitonov_egor', keywords: 'telegram tg', run: open(profile.telegramUrl) },
    ]

    return [...pages, ...actions, ...links]
  }, [copyEmail, l, navigate, openTerminal, t, toggleLang])
}
