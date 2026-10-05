import { useCallback } from 'react'
import { useLang, type Localized } from './lang'

export const ui = {
  navNow: { en: 'now', ru: 'сейчас' },
  navUses: { en: 'uses', ru: 'сетап' },
  navWriting: { en: 'writing', ru: 'тексты' },
  navGuestbook: { en: 'guestbook', ru: 'гостевая' },
  navResume: { en: 'resume', ru: 'резюме' },
  navTutoring: { en: 'tutoring', ru: 'репетиторство' },
  navSource: { en: 'source', ru: 'код сайта' },
  menu: { en: 'menu', ru: 'меню' },
  openMenu: { en: 'Open command menu', ru: 'Открыть меню команд' },
  terminalHint: { en: 'press ` for a terminal', ru: 'нажмите ` для терминала' },
  home: { en: 'home', ru: 'главная' },
  back: { en: 'Back home', ru: 'На главную' },
  now: { en: 'now', ru: 'сейчас' },
  probablyAsleep: { en: 'probably asleep', ru: 'наверное, сплю' },
  copied: { en: 'Copied', ru: 'Скопировано:' },
  bookCall: { en: 'Book a call', ru: 'Созвониться' },
  sectionGlance: { en: 'At a glance', ru: 'Коротко' },
  sectionBuild: { en: 'What I build', ru: 'Что я делаю' },
  sectionExperience: { en: 'Experience', ru: 'Опыт' },
  sectionProjects: { en: 'Projects', ru: 'Проекты' },
  sectionTechx: { en: 'TechX Florida 2025', ru: 'TechX Florida 2025' },
  sectionWriting: { en: 'Writing', ru: 'Тексты' },
  updated: { en: 'Updated', ru: 'Обновлено' },
  draft: { en: 'draft', ru: 'черновик' },
} satisfies Record<string, Localized>

export type UiKey = keyof typeof ui

export function useT() {
  const { lang } = useLang()
  return useCallback((key: UiKey): string => ui[key][lang], [lang])
}
