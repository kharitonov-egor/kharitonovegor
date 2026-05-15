export type Experience = {
  title: string
  date: string
  organization: string
  descriptions: string[]
}

export const experience: Experience[] = [
  {
    title: 'Software Engineer',
    date: 'March 2025 - Present',
    organization: '<a href="https://stableinsolutions.com" target="_blank" rel="noopener noreferrer">Stablein Solutions</a>',
    descriptions: [
      '• Built an AI-powered order ingestion pipeline to process <strong>2,000+</strong> daily purchase orders, reducing processing time from hours to minutes.',
      '• Expanded the ingestion pipeline from PDF-only processing to support XML files and email-submitted purchase orders, increasing supported input types by <strong>40%</strong>.',
      '• Built an internal Next.js dashboard using React, Supabase, and Tailwind CSS to help operations teams review, correct, and track AI-extracted purchase order data.',
      '• Maintained a daily automated reporting pipeline that delivered processing metrics across <strong>4</strong> services, giving leadership visibility into order throughput and operational performance.',
    ],
  },
]
