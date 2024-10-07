// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

type IpcRendererCallback = (event: IpcRendererEvent, ...args: any[]) => void

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on: (channel: string, func: IpcRendererCallback) => ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
    send: (channel: string, data?: any) => ipcRenderer.send(channel, data)
  }
});