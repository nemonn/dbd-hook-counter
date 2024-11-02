import { app, Tray, Menu } from "electron";
import path from "path";
import { isLocked, lock } from "./main";

export function buildMenu () {
  return Menu.buildFromTemplate([
    {
      label: isLocked ? "Unlock" : "Lock",
      click: () => lock()
    },
    {
      label: "Quit",
      click: () => app.quit()
    }
  ]);
}

export function createTray (): Tray {
  const iconPath = path.join(__dirname, "icon.ico");
  const tray = new Tray(iconPath);
  const menu = buildMenu();

  tray.setToolTip("Hook Counter");
  tray.setContextMenu(menu);

  return tray
}