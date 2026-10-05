import logo from '../assets/logos/ieee-cs.webp'
import type { MarkProps } from './BrandLink'

const MOTION =
  '-rotate-180 scale-75 transition-transform delay-100 duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-focus-within/brand:rotate-0 group-focus-within/brand:scale-100 group-hover/brand:rotate-0 group-hover/brand:scale-100'

export default function IeeeMark({ still = false }: MarkProps) {
  return (
    <img
      src={logo}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`h-full w-full rounded-full ${still ? '' : `bg-[#111] p-[2px] ${MOTION}`}`}
    />
  )
}
