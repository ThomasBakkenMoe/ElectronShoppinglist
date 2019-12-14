const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

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

    //Quit application when closed
    mainWindow.on('closed', ()=>{
       app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu)
});

// Handle createAddWindow()
function createAddWindow(){
    // Create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });

    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'), // dirname/addWindow.html
        protocol: 'file:', // file:
        slashes: true // //
    })); //What this urlObject is doing: It constructs the path "file://dirname/addWindow.html" and passes it into the loadURL function.

    //Garbage collection handle
    addWindow.on('close', ()=>{
        addWindow = null; //Removes the addWindow from memory.
    })

}

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Add Item',
                click() {
                    createAddWindow();
                }
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