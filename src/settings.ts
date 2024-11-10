import electronSettings from "electron-settings"

export type Scale = 1 | 0.95 | 0.9 | 0.85 | 0.8 | 0.75 | 0.7

export interface Settings {
  scale: Scale
}

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