import { app, Tray, Menu, shell, nativeImage } from "electron"
import path from "path"
import { settings, Scale } from "./settings"

export let tray: Tray | undefined

const iconPath = path.join(__dirname, "icon.ico")

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
      label: "Hook Counter",
      enabled: false,
      icon: nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 })
    },
    {
      type: "separator"
    },
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
      label: "About",
      click: () => shell.openExternal("https://github.com/nemonn/dbd-hook-counter")
    },
    {
      type: "separator"
    },
    {
      label: "Quit",
      accelerator: "Alt+Esc",
      click: () => app.quit()
    }
  ])

  tray.setContextMenu(menu)
  return menu
}

export function createTray (): Tray {
  tray = new Tray(iconPath)
  
  tray.setToolTip("Hook Counter")
  
  createMenu()
  
  return tray
}
