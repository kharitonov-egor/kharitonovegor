import type { CSSProperties } from 'react'
import bull from '../assets/logos/usf.webp'
import type { MarkProps } from './BrandLink'

const mask: CSSProperties = {
  maskImage: `url(${bull})`,
  WebkitMaskImage: `url(${bull})`,
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
}

const MOTION =
  '-rotate-12 scale-75 transition-transform delay-100 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-focus-within/brand:rotate-0 group-focus-within/brand:scale-100 group-hover/brand:rotate-0 group-hover/brand:scale-100'

export default function UsfMark({ still = false }: MarkProps) {
  return <span aria-hidden="true" className={`block h-full w-full bg-current ${still ? '' : MOTION}`} style={mask} />
}
