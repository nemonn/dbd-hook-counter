export interface UI {
  width: number
  height: number
  size: number
  spacing: number
  left: number
  bottom: number
}

interface Options {
  scale: number
}

export function getUi (options: Options): UI {
  const { width, height } = forceAspectRatio({
    width: screen.width,
    height: screen.height,
    x: 16,
    y: 9
  })

  /*
    FHD (100%)
    width: 1920
    height: 1080
    size: 50
    spacing: 38
    left: 16
    bottom: 337
  */

  return {
    width,
    height,
    size: Math.round(height / 100 * 4.63 * options.scale),
    spacing: Math.round(height / 100 * 3.52 * options.scale),
    left: Math.round(width / 100 * 0.83 * options.scale),
    bottom: Math.round(height / 100 * 31.2 * options.scale)
  }
}

function forceAspectRatio ({
  width,
  height,
  x,
  y
}: {
  width: number,
  height: number,
  x: number,
  y: number
}): {
  width: number,
  height: number
} {

  const targetWidth = height * (x / y)
  const targetHeight = width * (y / x)

  if (targetWidth <= width) return { width: targetWidth, height }

  return { width, height: targetHeight }
}