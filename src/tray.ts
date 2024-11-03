import { app, Tray, Menu } from "electron";
import path from "path";

export function buildMenu () {
  return Menu.buildFromTemplate([
    {
      label: "Quit",
      click: () => app.quit()
    }
  ]);
}

export function createTray (): Tray {
  const iconPath = path.join(__dirname, "icon.ico");
  const tray = new Tray(iconPath);
  tray.setToolTip("Hook Counter");
  
  const menu = buildMenu();
  tray.setContextMenu(menu);

  return tray
}