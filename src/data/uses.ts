import type { Localized } from '../i18n/lang'

export type UsesItem = {
  name: string
  href?: string
  note: Localized
}

export type UsesGroup = {
  label: Localized
  items: UsesItem[]
}

export const uses: UsesGroup[] = [
  {
    label: { en: 'Computer', ru: 'Компьютер' },
    items: [
      {
        name: 'Windows 11 Pro',
        note: { en: 'Main machine.', ru: 'Основная система.' },
      },
    ],
  },
  {
    label: { en: 'Coding', ru: 'Код' },
    items: [
      {
        name: 'Claude Code',
        href: 'https://claude.com/claude-code',
        note: { en: 'Coding agent.', ru: 'Агент для написания кода.' },
      },
      {
        name: 'T3 Code',
        note: {
          en: 'Desktop app for running coding agents.',
          ru: 'Десктоп-приложение для работы с агентами.',
        },
      },
    ],
  },
  {
    label: { en: 'Meetings and notes', ru: 'Встречи и заметки' },
    items: [
      {
        name: 'Granola',
        href: 'https://granola.ai',
        note: { en: 'Meeting notes.', ru: 'Заметки со встреч.' },
      },
      {
        name: 'Wispr Flow',
        href: 'https://wisprflow.ai',
        note: { en: 'Dictation instead of typing.', ru: 'Диктую вместо набора текста.' },
      },
      {
        name: 'Trello',
        href: 'https://trello.com',
        note: { en: 'Task boards.', ru: 'Доски задач.' },
      },
    ],
  },
  {
    label: { en: 'This site', ru: 'Этот сайт' },
    items: [
      {
        name: 'Vite, React, TypeScript, Tailwind CSS',
        note: { en: 'The code.', ru: 'Код.' },
      },
      {
        name: 'Vercel',
        href: 'https://vercel.com',
        note: { en: 'Hosting.', ru: 'Хостинг.' },
      },
      {
        name: 'PostHog',
        href: 'https://posthog.com',
        note: { en: 'Analytics.', ru: 'Аналитика.' },
      },
      {
        name: 'Supabase',
        href: 'https://supabase.com',
        note: {
          en: 'Guestbook and the live cursors.',
          ru: 'Гостевая книга и курсоры посетителей.',
        },
      },
      {
        name: 'Cal.com',
        href: 'https://cal.com',
        note: { en: 'Booking calls.', ru: 'Запись на созвоны.' },
      },
    ],
  },
]
