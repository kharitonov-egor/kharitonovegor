export type StackGroup = {
  label: string
  items: string[]
}

export const stack: StackGroup[] = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Vite'],
  },
  {
    label: 'Backend & Data',
    items: ['Node.js', 'Supabase', 'PostgreSQL'],
  },
  {
    label: 'AI',
    items: ['LLM document extraction', 'Ingestion pipelines'],
  },
]
