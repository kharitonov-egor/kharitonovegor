import type { Localized } from '../i18n/lang'
import type { OrgId } from './orgs'

export type Lane = 'main' | 'work' | 'ieee'

export type Role = {
  id: string
  title: Localized
  org: OrgId
  start: string
  end: string | null
  lane: Lane
  descriptions: Localized<string[]>
}

export const experience: Role[] = [
  {
    id: 'stablein-swe',
    title: { en: 'Software Engineer', ru: 'Инженер-программист' },
    org: 'stablein',
    start: '2025-03',
    end: '2026',
    lane: 'work',
    descriptions: {
      en: [
        'Built an AI-powered order ingestion pipeline to process <strong>2,000+</strong> daily purchase orders, reducing processing time from hours to minutes.',
        'Expanded the ingestion pipeline from PDF-only processing to support XML files and email-submitted purchase orders, increasing supported input types by <strong>40%</strong>.',
        'Built an internal Next.js dashboard using React, Supabase, and Tailwind CSS to help operations teams review, correct, and track AI-extracted purchase order data.',
        'Maintained a daily automated reporting pipeline that delivered processing metrics across <strong>4</strong> services, giving leadership visibility into order throughput and operational performance.',
      ],
      ru: [
        'Построил AI-пайплайн приёма заказов, который обрабатывает <strong>2 000+</strong> заказов на закупку в день и сократил время обработки с часов до минут.',
        'Расширил пайплайн: кроме PDF он стал принимать XML-файлы и заказы из email. Число поддерживаемых форматов выросло на <strong>40%</strong>.',
        'Сделал внутренний дашборд на Next.js, React, Supabase и Tailwind CSS, где операционная команда проверяет, исправляет и отслеживает данные заказов, извлечённые AI.',
        'Поддерживал ежедневные автоматические отчёты с метриками обработки по <strong>4</strong> сервисам, по которым руководство следило за потоком заказов.',
      ],
    },
  },
]
