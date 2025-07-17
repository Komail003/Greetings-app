const { app, BrowserWindow, ipcMain, powerMonitor } = require("electron");
const path = require("path");

let mainWindow;
const os = require("os");
const userName = os.userInfo().username;

powerMonitor.on("unlock-screen", () => {
  mainWindow.webContents.send("show-greeting", userName);
});

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  powerMonitor.on("unlock-screen", () => {
    console.log("Screen unlocked");
    mainWindow.webContents.send("show-greeting");
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
