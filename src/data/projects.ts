import ieeeShot from '../assets/projects/ieee-cs-usf.webp'
import techxShot from '../assets/projects/techx-2025.webp'
import type { Localized } from '../i18n/lang'

export type Project = {
  id: string
  title: string
  blurb: Localized
  href: string
  internal: boolean
  image?: string
  tags: string[]
}

export const projects: Project[] = [
  {
    id: 'order-pipeline',
    title: 'Order ingestion pipeline',
    blurb: {
      en: 'AI pipeline at Stablein Solutions that reads purchase orders from PDFs, XML files and emails and turns them into one order format. 2,000+ orders a day.',
      ru: 'AI-пайплайн в Stablein Solutions: читает заказы из PDF, XML и email и приводит их к одному формату. Больше 2 000 заказов в день.',
    },
    href: '/projects/order-pipeline',
    internal: true,
    tags: ['LLM extraction', 'Next.js', 'Supabase', 'Tailwind CSS'],
  },
  {
    id: 'techx-2025',
    title: 'TechX Florida 2025',
    blurb: {
      en: 'Site for Florida\'s largest student-run AI conference. 1,100+ unique visitors. I led the 3-person team that built it.',
      ru: 'Сайт крупнейшей студенческой AI-конференции во Флориде. 1 100+ уникальных посетителей. Я руководил командой из 3 человек.',
    },
    href: 'https://techxflorida.com/2025',
    internal: false,
    image: techxShot,
    tags: ['Next.js', 'React'],
  },
  {
    id: 'ieee-cs-usf',
    title: 'IEEE CS at USF',
    blurb: {
      en: 'Chapter site with people, events, news, mentorship and partners for a 1,000+ member student chapter.',
      ru: 'Сайт отделения: люди, мероприятия, новости, менторство и партнёры для 1 000+ участников.',
    },
    href: 'https://www.ieeecsusf.com',
    internal: false,
    image: ieeeShot,
    tags: ['Next.js', 'React'],
  },
]
