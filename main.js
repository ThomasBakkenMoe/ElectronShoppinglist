const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

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

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu)
});

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Add Item',

            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }

        ]
    }
];