import ieeeLogo from '../assets/logos/ieee-cs.webp'
import stableinLogo from '../assets/logos/ss_2.jpg'
import usfLogo from '../assets/logos/usf.webp'
import type { Localized } from '../i18n/lang'

export type OrgId = 'stablein' | 'ieee-cs-usf' | 'usf'

export type Org = {
  name: string
  shortName: string
  url: string
  logo: string
  blurb: Localized
}

export const orgs: Record<OrgId, Org> = {
  stablein: {
    name: 'Stablein Solutions',
    shortName: 'Stablein',
    url: 'https://stableinsolutions.com',
    logo: stableinLogo,
    blurb: {
      en: 'Builds AI automation that replaces manual order processing for promotional products suppliers and distributors.',
      ru: 'Делает AI-автоматизацию, которая заменяет ручную обработку заказов у поставщиков и дистрибьюторов промопродукции.',
    },
  },
  'ieee-cs-usf': {
    name: 'IEEE Computer Society at USF',
    shortName: 'IEEE CS USF',
    url: 'https://www.ieeecsusf.com',
    logo: ieeeLogo,
    blurb: {
      en: 'The student chapter of the IEEE Computer Society at USF. 1,000+ members, 170+ events, and the team behind TechX Florida.',
      ru: 'Студенческое отделение IEEE Computer Society в USF. Больше 1 000 участников, 170+ мероприятий и команда TechX Florida.',
    },
  },
  usf: {
    name: 'University of South Florida',
    shortName: 'USF',
    url: 'https://www.usf.edu',
    logo: usfLogo,
    blurb: {
      en: 'Public research university in Tampa, Florida.',
      ru: 'Государственный исследовательский университет в Тампе, Флорида.',
    },
  },
}
