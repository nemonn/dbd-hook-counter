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

  const ui = {
    width: 1920,
    height: 1080,
    size: 46,
    spacing: 42,
    left: 18,
    bottom: 339
  }

  const settings = await getSettings()
  const scale = settings.scale || 1

  return {
    width,
    height,
    scale,
    size: height / 100 * (ui.size * 100 / ui.height) * scale,
    spacing: height / 100 * (ui.spacing * 100 / ui.height) * scale,
    left: width / 100 * (ui.left * 100 / ui.width) * scale,
    bottom: height / 100 * (ui.bottom * 100 / ui.height) * scale
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