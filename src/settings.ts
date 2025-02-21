import electronSettings from "electron-settings"
import { Settings } from "./types"

export const settings: Settings = {
  scale: 1
}

export async function loadSettings (): Promise<Settings> {
  const keys = Object.keys(settings) as Array<keyof Settings>

  await Promise.all(keys.map(async (setting) => {
    const value = await electronSettings.get(setting)
    
    if (value === undefined || value === null) {
      await electronSettings.set(setting, settings[setting])
    } else {
      settings[setting] = value as Settings[typeof setting]
    }
  }))

  return settings
}

export async function setSetting (key: keyof Settings, value: any): Promise<void> {
  settings[key] = value
  return electronSettings.set(key, value)
}