import { Settings } from "../types"

export async function getSettings (): Promise<Settings> {
  const settings = await window.electron.ipcRenderer.invoke("getSettings")
  return settings
}