import { getSettings } from "./settings"

export interface UI {
  width: number
  height: number
  scale: number
  size: number
  spacing: number
  left: number
  bottom: number
}

export async function buildUi (): Promise<UI> {
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

  const settings = await getSettings()
  const scale = settings.scale || 1

  return {
    width,
    height,
    scale,
    size: Math.round(height / 100 * 4.63 * scale),
    spacing: Math.round(height / 100 * 3.52 * scale),
    left: Math.round(width / 100 * 0.83 * scale),
    bottom: Math.round(height / 100 * 31.2 * scale)
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