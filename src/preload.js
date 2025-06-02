const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  updateTime: (timeString, mode) =>
    ipcRenderer.send('update-time', timeString, mode),
  onTraySwitchMode: (callback) => ipcRenderer.on('tray-switch-mode', callback),
  onTrayReset: (callback) => ipcRenderer.on('tray-reset', callback),
  onTrayStart: (callback) => ipcRenderer.on('tray-start', callback),
});
