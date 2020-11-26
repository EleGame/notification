const {remote} = require('electron');
const { shell } = require('electron')

document.getElementById('legal').onclick = function(){
    var win = remote.getCurrentWindow();
    win.hide()
  }

document.getElementById('mais').onclick = function(){
    var win = remote.getCurrentWindow();
    win.hide()
    shell.openExternal('https://insper.github.io/Z01.1/')
  }

