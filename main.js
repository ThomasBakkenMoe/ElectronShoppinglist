const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;

// Listen for app to be ready

app.on('ready', ()=>{
    // Create new window
    mainWindow = new BrowserWindow({}); // Parameter object is as of yet empty, as there is no configuration options that we need to pass in.
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'), // dirname/mainWindow.html
        protocol: 'file:', // file:
        slashes: true // //
    })); //What this urlObject is doing: It constructs the path "file://dirname/mainWindow.html" and passes it into the loadURL function.
});