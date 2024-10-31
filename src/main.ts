import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import settings from "electron-settings";

const DEBUG = false;

const options = {
  webPreferences: {
    preload: path.join(__dirname, "preload.js")
  },

  closable: true,
  fullscreenable: false,
  hasShadow: false,
  maximizable: false,
  minimizable: false,
  movable: true,
  resizable: false,

  ...(!DEBUG ? {
    width: 378, // width and height are also defined in main.css
    height: 467,
    transparent: true,
    frame: false,
  } : {
    backgroundColor: "black"
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

  // Disable keyboard reload shortcuts
  mainWindow.removeMenu();

  if (!DEBUG) {
    // Set always on top
    mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    mainWindow.setAlwaysOnTop(true, "screen-saver", 1);
    mainWindow.on("blur", () => mainWindow.setAlwaysOnTop(true));
    
    // Store window position when it is moved
    mainWindow.on("moved", onWindowMove);
  }

  // Load index.html
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open dev tools
  if (DEBUG) mainWindow.webContents.openDevTools();

  // Open window at last position
  setWindowPosition();
};

const onWindowMove = () => {
  const [ x, y ] = mainWindow.getPosition()
  settings.set("position", { x, y });
}

const setWindowPosition = async () => {
  const position = (await settings.get("position")) as { x: number, y: number } | undefined;
  
  if (position) {
    mainWindow.setPosition(position.x, position.y);
  } else {
    mainWindow.center();
  }
}

app.disableHardwareAcceleration();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  if (!mainWindow) return

  globalShortcut.register("Alt+1", () => {
    mainWindow.webContents.send("cycle-stage", 1);
  });

  globalShortcut.register("Alt+2", () => {
    mainWindow.webContents.send("cycle-stage", 2);
  });

  globalShortcut.register("Alt+3", () => {
    mainWindow.webContents.send("cycle-stage", 3);
  });

  globalShortcut.register("Alt+4", () => {
    mainWindow.webContents.send("cycle-stage", 4);
  });

  globalShortcut.register("Alt+0", () => {
    mainWindow.webContents.send("reset-stages");
  });

  globalShortcut.register("Alt+X", () => lock());

  mainWindow.webContents.on("ipc-message", (event, channel, data) => onEvent(channel, data));

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
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

let locked = false;
function lock () {
  locked = !locked;
  mainWindow.setIgnoreMouseEvents(locked);
  mainWindow.webContents.send("lock", locked);
}

function onEvent (type: string, data: any) {
  if (type === "close-app") {
    app.quit();
  }
}