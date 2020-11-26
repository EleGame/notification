// note that the fs package does not exist on a normal browser
const convert = require('xml-js');
const fs = require("fs");

//a dialog box module from electron
const { dialog } = require('electron');

//document.getElementById('myButton').onclick = function(){
//    // do stuff
//    console.log("Oi!");
//
//    const xmlFile = fs.readFileSync('/home/corsi/teste.xml', 'utf8')
//    const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}));
//
//  }
