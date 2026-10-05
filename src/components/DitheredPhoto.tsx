import { useEffect, useRef, useState } from 'react'

const SIZE = 96
const CONTRAST = 1.5
const MIDPOINT = 118
const DARK = [17, 17, 17]
const LIGHT = [222, 218, 213]

function dither(image: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return
  canvas.width = SIZE
  canvas.height = SIZE
  const side = Math.min(image.naturalWidth, image.naturalHeight)
  const sx = (image.naturalWidth - side) / 2
  const sy = (image.naturalHeight - side) / 2
  ctx.drawImage(image, sx, sy, side, side, 0, 0, SIZE, SIZE)
  const frame = ctx.getImageData(0, 0, SIZE, SIZE)
  const px = frame.data
  const luminance = new Float32Array(SIZE * SIZE)
  for (let i = 0; i < luminance.length; i++) {
    const l = 0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]
    luminance[i] = (l - 128) * CONTRAST + MIDPOINT
  }
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = y * SIZE + x
      const on = luminance[i] > 128
      const error = luminance[i] - (on ? 255 : 0)
      if (x + 1 < SIZE) luminance[i + 1] += (error * 7) / 16
      if (y + 1 < SIZE) {
        if (x > 0) luminance[i + SIZE - 1] += (error * 3) / 16
        luminance[i + SIZE] += (error * 5) / 16
        if (x + 1 < SIZE) luminance[i + SIZE + 1] += error / 16
      }
      const [r, g, b] = on ? LIGHT : DARK
      px[i * 4] = r
      px[i * 4 + 1] = g
      px[i * 4 + 2] = b
      px[i * 4 + 3] = 255
    }
  }
  ctx.putImageData(frame, 0, 0)
}

type Props = {
  src: string
  alt: string
  className?: string
}

export default function DitheredPhoto({ src, alt, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      if (canvasRef.current) dither(image, canvasRef.current)
    }
  }, [src])

  return (
    <div
      className={`group/photo relative overflow-hidden bg-card ${className}`}
      onClick={() => setRevealed((v) => !v)}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={`h-full w-full object-cover transition-opacity duration-300 group-hover/photo:opacity-100 print:opacity-100 ${revealed ? 'opacity-100' : 'opacity-0'}`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 [image-rendering:pixelated] group-hover/photo:opacity-0 print:hidden ${revealed ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  )
}
