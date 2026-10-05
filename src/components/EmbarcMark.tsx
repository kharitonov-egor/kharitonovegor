import type { MarkProps } from './BrandLink'

const BARS = [
  { x: 0, y: 0, shift: 'translate-x-[2.5px]' },
  { x: 5, y: 2, shift: '-translate-x-[2.5px]' },
  { x: 0, y: 4, shift: 'translate-x-[2.5px]' },
  { x: 5, y: 6, shift: '-translate-x-[2.5px]' },
  { x: 0, y: 8, shift: 'translate-x-[2.5px]' },
]

export default function EmbarcMark({ still = false }: MarkProps) {
  return (
    <svg viewBox="0 0 10 10" className="h-full w-full" fill="currentColor" aria-hidden="true">
      {BARS.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={bar.y}
          width={5}
          height={2}
          className={
            still
              ? undefined
              : `${bar.shift} transition-transform duration-500 ease-out group-hover/brand:translate-x-0 group-focus-within/brand:translate-x-0`
          }
          style={still ? undefined : { transitionDelay: `${120 + i * 70}ms` }}
        />
      ))}
    </svg>
  )
}
