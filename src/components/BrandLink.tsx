import { usePostHog } from 'posthog-js/react'
import type { ComponentType, CSSProperties, ReactNode } from 'react'
import type { Brand } from '../data/brands'
import { useLocalize } from '../i18n/lang'

export type MarkProps = { still?: boolean }

type Props = {
  brand: Brand
  Mark: ComponentType<MarkProps>
  children: ReactNode
}

export default function BrandLink({ brand, Mark, children }: Props) {
  const l = useLocalize()
  const posthog = usePostHog()
  const linkColor = brand.text ?? brand.color
  const chipStyle = {
    color: linkColor,
    background: `${linkColor}1a`,
    '--tw-ring-color': `${linkColor}40`,
  } as CSSProperties

  return (
    <span className="group/brand relative inline-block">
      <a
        href={brand.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => posthog?.capture('brand_click', { brand: brand.name })}
        className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-px align-baseline font-medium ring-1 ring-inset transition-colors"
        style={chipStyle}
      >
        <span className="inline-block h-3.5 w-3.5 shrink-0">
          <Mark still />
        </span>
        {children}
      </a>
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute left-0 top-full z-30 mt-3 w-[19rem] origin-top-left -translate-y-1 scale-95 opacity-0 transition duration-200 ease-out group-focus-within/brand:visible group-focus-within/brand:translate-y-0 group-focus-within/brand:scale-100 group-focus-within/brand:opacity-100 group-hover/brand:visible group-hover/brand:translate-y-0 group-hover/brand:scale-100 group-hover/brand:opacity-100 print:hidden"
      >
        <span
          aria-hidden="true"
          className="absolute -top-1.5 left-6 h-3 w-3 rotate-45 rounded-[2px]"
          style={{ background: brand.color }}
        />
        <span className="relative block overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]">
          <span className="flex items-center gap-3 px-4 py-3" style={{ background: brand.color, color: brand.ink }}>
            <span className="h-6 w-6 shrink-0">
              <Mark />
            </span>
            <span className="text-[15px] font-semibold leading-none tracking-tight">{brand.name}</span>
          </span>
          <span className="block px-4 pb-4 pt-3 text-sm leading-relaxed text-fg/85">{l(brand.description)}</span>
        </span>
      </span>
    </span>
  )
}
