const { app, BrowserWindow, screen } = require('electron')
const { electron } = require("electron");
const { Menu, Tray } = require('electron')
const { shell } = require('electron')

var amqp = require('amqplib/callback_api');
const config = require('electron-json-config');


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
      contextIsolation: false,
      webviewTag: true
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

  win.loadFile('index.html')
//  win.webContents.openDevTools()

  queue('12', '134', win);
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

function queue (groupId, userId, win) {
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) { throw error0; }
    connection.createChannel(function(error1, channel) {
      if (error1) { throw error1; }
      var exchange = groupId;

      channel.assertExchange(exchange, 'fanout', { durable: false });

      channel.assertQueue('', { exclusive: true }, function(error2, q) {
        if (error2) { throw error2; }
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
        channel.bindQueue(q.queue, exchange, '');

        channel.consume(q.queue, function(msg) {
          if (msg.content) {
            console.log(" [x] %s", msg.content.toString());
            win.loadFile('index.html')
            win.show();
          }
        }, { noAck: true });
      });
    });
  });
}
