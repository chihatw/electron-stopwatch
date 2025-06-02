const { app, BrowserWindow, Tray, ipcMain, Menu } = require('electron');
const path = require('path');

let tray = null;
let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  // TrayアイコンをisTemplate: trueで生成
  tray = new Tray(path.join(__dirname, '../assets/trayicon.png'), {
    isTemplate: true,
  });
  tray.setToolTip('ストップウォッチ');
  tray.setTitle('00:00:00 W');

  tray.on('click', () => {
    if (!win || win.isDestroyed()) {
      createWindow();
    } else {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    }
  });

  const showAndFocusWindow = () => {
    if (!win || win.isDestroyed()) {
      createWindow();
    } else {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    }
  };

  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'スタート',
      click: () => {
        showAndFocusWindow();
        if (win) win.webContents.send('tray-start');
      },
      enabled: true,
    },
    {
      label: 'リセット',
      click: () => {
        showAndFocusWindow();
        if (win) win.webContents.send('tray-reset');
      },
      enabled: true,
    },
    {
      label: 'モード切替',
      click: () => {
        showAndFocusWindow();
        if (win) win.webContents.send('tray-switch-mode');
      },
    },
    {
      label: '最小化',
      click: () => {
        if (win) win.minimize();
      },
      enabled: true,
    },
    { type: 'separator' },
    {
      label: 'electron-stopwatch を終了',
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(trayMenu);

  ipcMain.on('update-time', (event, timeString, mode) => {
    let modeMark = '';
    if (mode === 'working') modeMark = ' W';
    else if (mode === 'break') modeMark = ' B';
    tray.setImage(path.join(__dirname, '../assets/trayicon.png'));
    tray.setTitle(timeString + modeMark);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
