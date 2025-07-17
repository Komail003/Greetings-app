const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onShowGreeting: (callback) => ipcRenderer.on("show-greeting", callback),
});
contextBridge.exposeInMainWorld("electronAPI", {
  onShowGreeting: (callback) =>
    ipcRenderer.on("show-greeting", (event, userName) => {
      callback(userName);
    }),
});
