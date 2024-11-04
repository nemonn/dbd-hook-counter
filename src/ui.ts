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

export function getUi () {
  const { width, height } = forceAspectRatio({
    width: screen.width,
    height: screen.height,
    x: 16,
    y: 9
  })

  /*
    FHD
    width: 1920
    height: 1080
    size: 50
    spacing: 38
    left: 16
    top: 429 
  */

  return {
    width,
    height,
    size: Math.round(height / 100 * 4.63),
    spacing: Math.round(height / 100 * 3.52),
    top: Math.round(height / 100 * 39.72),
    left: Math.round(width / 100 * 0.83)
  }
}