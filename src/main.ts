import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import path from "path";
import { createTray, onScaleChange, createMenu } from "./tray";
import { settings, loadSettings, setSetting } from "./settings";
import { Scale } from "./types";

const DEBUG = false;

const options = {
  webPreferences: {
    preload: path.join(__dirname, "preload.js"),
    zoomFactor: 1.0
  },

  closable: true,
  
  ...(!DEBUG ? {

    fullscreen: true,
    hasShadow: false,
    maximizable: false,
    minimizable: false,
    resizable: false,
    alwaysOnTop: true,
    focusable: false,
    skipTaskbar: true,
    transparent: true,
    frame: false,

  } : {

    backgroundColor: "rgb(30,30,30)"
  
  })
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow | undefined;

const createWindow = () => {
  // Create the browser window
  mainWindow = new BrowserWindow(options);

  if (DEBUG) {

    // Open dev tools
    mainWindow.webContents.openDevTools();

  } else {

    // Set always on top
    mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    mainWindow.setAlwaysOnTop(true, "screen-saver", 1);
    
    // Disable pointer events
    mainWindow.setIgnoreMouseEvents(true);

    // Disable keyboard reload shortcut
    mainWindow.removeMenu();
  
  }

  // Load index.html
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
};

app.disableHardwareAcceleration();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  await loadSettings();

  createWindow();
  if (!mainWindow) return

  for (const i of [1, 2, 3, 4]) {
    globalShortcut.register(`Alt+${i}`, () => {
      mainWindow.webContents.send("addStage", i);
    });

    globalShortcut.register(`Alt+Num${i}`, () => {
      mainWindow.webContents.send("addStage", i);
    });

    globalShortcut.register(`Alt+Shift+${i}`, () => {
      mainWindow.webContents.send("removeStage", i);
    });

    globalShortcut.register(`Alt+Shift+Num${i}`, () => {
      mainWindow.webContents.send("removeStage", i);
    });
  }

  globalShortcut.register("Alt+0", () => {
    mainWindow.webContents.send("resetStages");
  });

  globalShortcut.register("Alt+Num0", () => {
    mainWindow.webContents.send("resetStages");
  });

  globalShortcut.register("Alt+Escape", () => {
    app.quit();
  });

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Update UI, tray manu and stored settings when HUD scale changes
  onScaleChange(async (scale: Scale) => {
    await setSetting("scale", scale);
    mainWindow.webContents.send("scaleChange", scale);
    createMenu();
  });

  // Display app in tray
  createTray();
});

app.on("will-quit", () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("getSettings", () => {
  return settings;
});