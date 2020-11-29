const {remote, shell} = require('electron');
const { ipcRenderer } = require('electron');

var win = remote.getCurrentWindow();

document.getElementById('legal').onclick = function(){
  win.hide()
}

document.getElementById('mais').onclick = function(){
  win.hide()
  shell.openExternal('https://insper.github.io/Z01.1/')
}

ipcRenderer.on('rabbitmq', (event, data) => {
  var webview = document.getElementById('msg')
  webview.src = data
  win.show()
});

var time = 0;
var interval = setInterval(closeWindownTimeout, 100);

function closeWindownTimeout () {
  var progress = document.getElementsByClassName('progress-bar').item(0);
  if (time < 100) {
    time = time + 5;
    progress.style.width = time + "%"
  } else {
    clearInterval(interval);
    setTimeout( function (){ win.hide(); }, 5000);
  }
};
