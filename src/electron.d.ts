export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        on(channel: string, func: (...args: any[]) => void): void;
        send(channel: string, data?: any): void;
      };
    };
  }
}
