import { app, Tray, Menu } from "electron";
import path from "path";

const menu = Menu.buildFromTemplate([
  {
    label: "Quit",
    click: () => app.quit()
  }
]);

export function createTray () {
  const iconPath = path.join(__dirname, "icon.ico");
  const tray = new Tray(iconPath);

  tray.setToolTip("Hook Counter");
  tray.setContextMenu(menu);

  return tray
}