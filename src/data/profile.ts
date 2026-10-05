import type { Localized } from '../i18n/lang'

export type Social = {
  event: string
  domId: string
  label: Localized
  href: string
}

export const profile = {
  name: { en: 'Egor Kharitonov', ru: 'Егор Харитонов' } satisfies Localized,
  role: { en: 'Software Engineer', ru: 'Инженер-программист' } satisfies Localized,
  roleLine: {
    en: 'Software Engineer · CS + Math at USF',
    ru: 'Инженер-программист · CS и математика в USF',
  } satisfies Localized,
  bio: {
    en: 'I build AI pipelines that turn messy documents into clean data. At Stablein Solutions, mine processed 2,000+ purchase orders a day. Now I study Computer Science and Math at USF and serve as Vice President of IEEE Computer Society at USF.',
    ru: 'Я делаю AI-пайплайны, которые превращают неряшливые документы в чистые данные. В Stablein Solutions мой пайплайн обрабатывал больше 2 000 заказов в день. Сейчас изучаю Computer Science и математику в USF и работаю вице-президентом IEEE Computer Society в USF.',
  } satisfies Localized,
  location: { en: 'Tampa, FL', ru: 'Тампа, Флорида' } satisfies Localized,
  timeZone: 'America/New_York',
  availability: null as Localized | null,
  email: 'egakhar@gmail.com',
  site: 'https://www.kharitonovegor.com',
  calUrl: 'https://cal.com/egor-kharitonov-j6h556',
  githubUser: 'kharitonov-egor',
  githubUrl: 'https://github.com/kharitonov-egor',
  linkedinUrl: 'https://www.linkedin.com/in/kharitonov-egor/',
  telegramUrl: 'https://t.me/kharitonov_egor',
  sourceUrl: 'https://github.com/kharitonov-egor/kharitonovegor',
  education: {
    school: 'University of South Florida',
    program: {
      en: 'Computer Science & Mathematics',
      ru: 'Computer Science и математика',
    } satisfies Localized,
  },
}

export const socials: Social[] = [
  {
    event: 'github_click',
    domId: 'GithubClick',
    label: { en: 'GitHub', ru: 'GitHub' },
    href: profile.githubUrl,
  },
  {
    event: 'linkedin_click',
    domId: 'LinkedinClick',
    label: { en: 'LinkedIn', ru: 'LinkedIn' },
    href: profile.linkedinUrl,
  },
  {
    event: 'email_click',
    domId: 'EmailClick',
    label: { en: 'Email', ru: 'Почта' },
    href: `mailto:${profile.email}`,
  },
  {
    event: 'telegram_click',
    domId: 'TelegramClick',
    label: { en: 'Telegram', ru: 'Telegram' },
    href: profile.telegramUrl,
  },
  {
    event: 'call_click',
    domId: 'CalClick',
    label: { en: 'Book a call', ru: 'Созвониться' },
    href: profile.calUrl,
  },
]
