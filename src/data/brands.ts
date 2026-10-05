import type { Localized } from '../i18n/lang'

export type Brand = {
  name: string
  href: string
  color: string
  ink: string
  text?: string
  description: Localized
}

export const embarc: Brand = {
  name: 'Embarc Collective',
  href: 'https://embarccollective.com',
  color: '#89E1CF',
  ink: '#111111',
  description: {
    en: 'A nonprofit startup hub in Tampa, Florida. Founders get personalized coaching and a community of other founders',
    ru: 'Некоммерческий стартап-хаб в Тампе, Флорида. Фаундеры получают персональный коучинг и сообщество других основателей',
  },
}

export const usf: Brand = {
  name: 'University of South Florida',
  href: 'https://www.usf.edu',
  color: '#006747',
  ink: '#FFFFFF',
  text: '#009374',
  description: {
    en: 'Public research university in Tampa, Florida. Top 50 public university, AAU member',
    ru: 'Государственный исследовательский университет в Тампе, Флорида. Топ-50 государственных вузов, член AAU',
  },
}

export const ieeeCs: Brand = {
  name: 'IEEE Computer Society at USF',
  href: 'https://www.ieeecsusf.com',
  color: '#E87722',
  ink: '#111111',
  description: {
    en: 'USF\'s student chapter of IEEE Computer Society. 1,000+ members, 170+ events, and the team behind TechX Florida',
    ru: 'Студенческое отделение IEEE Computer Society в USF. 1 000+ участников, 170+ мероприятий и команда TechX Florida',
  },
}
