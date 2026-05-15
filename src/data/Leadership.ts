export type Leadership = {
  title: string
  date: string
  organization: string
  descriptions: string[]
}

export const leadership: Leadership[] = [
  {
    title: 'Vice President',
    date: 'April 2026 - Present',
    organization: 'IEEE Computer Society at USF',
    descriptions: [
      '• Leading TechX Florida 2026 Conference planning for a <strong>900+</strong> member chapter by coordinating sponsor outreach, speaker recruitment, conference agenda planning, and weekly chapter events.',
    ],
  },
  {
    title: 'Technical Lead / Outreach Chair',
    date: 'August 2025 - May 2026',
    organization: 'IEEE Computer Society at USF',
    descriptions: [
      '• Spearheaded TechX Florida 2025, Florida\'s largest student-run AI conference, drawing <strong>336</strong> attendees and <strong>450+</strong> registrations from <strong>14+</strong> universities and companies by leading speaker outreach and event operations.',
      '• Led a 3-person dev team to ship two production websites, including the TechX Florida 2025 conference site (<a href="https://techxflorida.com/2025" rel="noopener noreferrer" target="_blank">techxflorida.com</a>) with <strong>1,100+</strong> unique visitors and the IEEE-CS USF chapter site (<a href="https://ieeecsusf.com" rel="noopener noreferrer" target="_blank">ieeecsusf.com</a>), by defining the tech stack, delegating ownership, and contributing core features.',
    ],
  },
]
