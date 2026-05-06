export type Leadership = {
  title: string
  date: string
  organization: string
  descriptions: string[]
}

export const leadership: Leadership[] = [
  {
    title: 'Vice-President',
    date: 'May 2026 - Present',
    organization: 'IEEE Computer Society at USF',
    descriptions: ['• Got elected in May 2026'],
  },
  {
    title: 'Tech Lead / Outreach Chair',
    date: 'August 2025 - May 2026',
    organization: 'IEEE Computer Society at USF',
    descriptions: ['• Spearheaded the organization of TechX Florida 2025, an AI conference (336 attendees, 450+ registrations).',
      '• Personally handled outreach to every speaker',
      '• Led a small dev team to build the TechX Florida 2025 website (<a href="https://techxflorida.com/2025" rel="noopener noreferrer" target="_blank">techxflorida.com</a>, 1100+ unique visitors) and the club`s site (<a href="https://ieeecsusf.com" rel="noopener noreferrer" target="_blank">ieeecsusf.com</a>). Defined the technical direction, delegated tasks, and contributed code myself.'
 
    ],
  },
]
