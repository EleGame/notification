const {remote, shell} = require('electron');

var win = remote.getCurrentWindow();
const app = require('electron').remote.app

document.getElementById('legal').onclick = function(){
    win.hide()
  }

document.getElementById('mais').onclick = function(){
    win.hide()
    shell.openExternal('https://insper.github.io/Z01.1/')
  }

var progress = document.getElementsByClassName('progress-bar').item(0);
var time = 0;
var interval = setInterval(closeWindownTimeout, 100);

function closeWindownTimeout () {
  if (time < 100) {
    time = time + 5;
    progress.style.width = time + "%"
  } else {
    clearInterval(interval);
    setTimeout( function (){ win.hide(); }, 5000);
  }
};

