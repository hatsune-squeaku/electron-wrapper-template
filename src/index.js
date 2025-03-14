const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    fullscreenable: false,
    menuBarVisible: false,
    webPreferences: {
      devTools: false
    }
  });
  mainWindow.setMenu(null);
  mainWindow.setAspectRatio(4/3);
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('enter-html-full-screen', () => {
    if (mainWindow.isFullScreen()) {
      setTimeout(() => {
        mainWindow.setFullScreen(false);
        mainWindow.maximize();
      }, 500);
    }
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
app.on('resize', function () {
  setTimeout(function () {
    var size = app.getSize();
    app.setSize(size[0], parseInt(size[0] * 9 / 16));
  }, 0);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
