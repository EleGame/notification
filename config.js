// ref:
//   - https://www.npmjs.com/package/electron-json-config
const {remote} = require('electron');
const { shell } = require('electron')
const config = require('electron-json-config');

// save user config
document.getElementById('salvar').onclick = function(){
    var groupID = document.getElementById("inputGroupID").value;
    var userID = document.getElementById("inputUserID").value;

    config.set('id', [groupID, userID]);
    console.log(config.get('foo')); // shows 'bar'
   
    var win = remote.getCurrentWindow();
    win.hide()
  }

// update forms with saved config
document.addEventListener('DOMContentLoaded', function() {
    if(config.has('id')){
       id = config.get('id');
       document.getElementById("inputGroupID").value = id[0];
       document.getElementById("inputUserID").value = id[1];
    }
}, false);
