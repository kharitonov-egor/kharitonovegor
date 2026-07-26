export type OpenSourceItem = {
  repo: string
  href: string
  description: string
}

export const openSource: OpenSourceItem[] = [
  {
    repo: 'hawksconnect.com',
    href: 'https://hawksconnect.com',
    description:
      'Student-built hub that brings events, clubs, and organizations across Hillsborough College campuses into one place.',
  },
  {
    repo: 'techxflorida.com',
    href: 'https://techxflorida.com/2025',
    description:
      'Conference site for TechX Florida 2025, Florida\'s largest student-run AI conference. 1,100+ unique visitors.',
  },
  {
    repo: 'ieeecsusf.com',
    href: 'https://ieeecsusf.com',
    description:
      'Chapter site for IEEE Computer Society at USF, shipped with a 3-person dev team.',
  },
]
