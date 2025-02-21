export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        on(channel: string, func: (...args: any[]) => void): void;
        invoke(channel: string, ...args: any[]): Promise<any>;
      };
    };
  }
}
