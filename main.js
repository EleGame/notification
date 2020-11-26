const { app, BrowserWindow, screen } = require('electron')
const { electron } = require("electron");
const { Menu, Tray } = require('electron')
const { shell } = require('electron')

const custon_icon = 'contents/imgs/icon.png'
const custon_title= 'Elementos de Sistemas'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow () {

  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;

  const win = new BrowserWindow({
    width: 500,
    height: 600,
    x: width - 550,
    y: 50,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
    frame: false,
    icon: custon_icon,
    title: custon_title
  })

  // https://stackoverflow.com/questions/42988166/show-and-hide-main-window-on-electron
  win.on('close', (event) => {
    if (app.quitting) {
      win = null
    } else {
      event.preventDefault()
      win.hide()
    }
  })

  let tray = null
  app.whenReady().then(() => {
    tray = new Tray(custon_icon)
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Show App', click:  function(){
          win.loadFile('index.html')
          win.show();
      } },
      { label: 'Site', click:  function(){
          shell.openExternal('https://insper.github.io/Z01.1/')
      } },
      { label: 'Config', click:  function(){
        win.loadFile('config.html')
        win.show();
      } },
      { label: 'Quit', click:  function(){
          app.quitting = true;
          app.quit()
      } }
    ])
    tray.setToolTip(custon_title)
    tray.setContextMenu(contextMenu)
  })

  win.loadFile('config.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('minimize',function(event){
    event.preventDefault();
    app.hide();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
