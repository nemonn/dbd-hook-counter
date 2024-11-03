import { app, screen, dialog } from "electron"
import { resolutions } from "./resolutions";

interface UI {
  screenWidth: number
  screenHeight: number
  width: number
  height: number
  left: number
  top: number
  size: number
  spacing: number
}

export const ui: UI = {
  screenWidth: 0,
  screenHeight: 0,
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  size: 0,
  spacing: 0
}

export function createUI () {
  const { width, height } = screen.getPrimaryDisplay().size
  const resolution = `${width}x${height}`
  const preset = resolutions[resolution]
  
  if (!preset) {
    app.quit()
    showResolutionError(resolution)
  }

  ui.screenWidth = width,
  ui.screenHeight = height,
  ui.width = preset.size,
  ui.height = preset.size * 4 + preset.spacing * 3,
  ui.left = preset.left,
  ui.top = preset.top,
  ui.size = preset.size,
  ui.spacing = preset.spacing

  return ui
}

function showResolutionError (resolution: string) {
  let supported = ""
  
  Object.keys(resolutions).forEach(key => {
    supported += `
- ${key}`
  })

  dialog.showErrorBox(
    `Unsupported resolution`,
    `${resolution} resolution is not supported.

Supported resolutions:${supported}`
  )
}