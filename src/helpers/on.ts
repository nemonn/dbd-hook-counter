export default function on (event: string, callback: (value?: any) => void) {
  window.electron.ipcRenderer.on(event, (_, value) => callback(value))
}