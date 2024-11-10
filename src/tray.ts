import { app, Tray, Menu } from "electron"
import path from "path"
import { settings, Scale } from "./settings"

export let tray: Tray | undefined

const callbacks: {
  onScaleChange: ((scale: Scale) => void)[] 
} = {
  onScaleChange: []
}

export function onScaleChange (callback: (scale: Scale) => void) {
  callbacks.onScaleChange.push(callback)
}

function setScale (scale: Scale) {
  callbacks.onScaleChange.forEach(callback => callback(scale))
}

export function createMenu (): Electron.Menu {
  const menu = Menu.buildFromTemplate([
    {
      type: "submenu",
      label: "HUD Scale",
      submenu: ([
        1,
        0.95,
        0.9,
        0.85,
        0.8,
        0.75,
        0.7
      ]).map((scale: Scale) => ({
        label: `${scale * 100}%`,
        type: "radio",
        checked: settings.scale === scale,
        click: () => setScale(scale)
      }))
    },
    {
      label: "Quit (Alt+Esc)",
      click: () => app.quit()
    }
  ])

  tray.setContextMenu(menu)
  return menu
}

export function createTray (): Tray {
  const iconPath = path.join(__dirname, "icon.ico")
  tray = new Tray(iconPath)
  
  tray.setToolTip("Hook Counter")
  
  createMenu()
  
  return tray
}
