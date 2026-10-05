import photo1 from '../assets/techx/techx-1.webp'
import photo2 from '../assets/techx/techx-2.webp'
import photo3 from '../assets/techx/techx-3.webp'
import photo4 from '../assets/techx/techx-4.webp'
import photo5 from '../assets/techx/techx-5.webp'
import photo6 from '../assets/techx/techx-6.webp'
import type { Localized } from '../i18n/lang'

export type Photo = {
  src: string
  width: number
  height: number
  alt: Localized
}

export const techxReportUrl = 'https://techxflorida.com/2025/report'

export const techxStats = {
  attendees: '336',
  registrations: '450+',
  talks: '11',
}

export const techxPhotos: Photo[] = [
  {
    src: photo1,
    width: 640,
    height: 480,
    alt: {
      en: 'Two volunteers at the IEEE Computer Society table',
      ru: 'Двое волонтёров у стола IEEE Computer Society',
    },
  },
  {
    src: photo2,
    width: 640,
    height: 480,
    alt: {
      en: 'Attendees talking in the main hall between sessions',
      ru: 'Участники общаются в главном зале между докладами',
    },
  },
  {
    src: photo3,
    width: 722,
    height: 480,
    alt: {
      en: 'Audience raising hands during a talk',
      ru: 'Зрители поднимают руки во время доклада',
    },
  },
  {
    src: photo4,
    width: 722,
    height: 480,
    alt: {
      en: 'Panelist speaking during the Careers in Tech panel',
      ru: 'Спикер на панели Careers in Tech',
    },
  },
  {
    src: photo5,
    width: 722,
    height: 480,
    alt: {
      en: 'Free headshot booth in front of the IEEE CS backdrop',
      ru: 'Бесплатная фотосессия на фоне баннера IEEE CS',
    },
  },
  {
    src: photo6,
    width: 722,
    height: 480,
    alt: {
      en: 'Attendees at a round table during lunch',
      ru: 'Участники за круглым столом во время обеда',
    },
  },
]
