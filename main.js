const {app, BrowserWindow, ipcMain, Menu, dialog} = require('electron')
const { SlippiGame } = require("@slippi/slippi-js")
const { meanBy } = require('lodash')
const path = require('path')
const url = require('url')
const fs = require('fs')
const ipc = ipcMain
let win
let loadDirectory

function createWindow(){
    win = new BrowserWindow({
        width: 940, 
        height: 560,
        minWidth: 940,
        minHeight: 560,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true
        }
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))

    /* OPEN DEV TOOLS*/
    win.webContents.openDevTools()
    /* ------------- */

    win.on('closed', () => {
        win = null
    })

    ipc.on('closeApp', ()=>{
        console.log('Clicked on close')
        win.close()
    })

    ipc.on('minApp', ()=>{
        console.log('Clicked on min')
        win.minimize()
    })

    ipc.on('maxResApp', ()=>{
        
        if(win.isMaximized()){
            console.log('Clicked on restore')
            win.restore()
        } else {
            console.log('Clicked on maximize')
            win.maximize()
        }
        
    })

    ipc.on('Page1', ()=>{
        console.log('Page 1 clicked')
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'load.html'),
            protocol: 'file',
            slashes: true
        }))
    })
    ipc.on('Page2', ()=>{
        console.log('Page 2 clicked')
    })
    ipc.on('Page3', ()=>{
        console.log('Page 3 clicked')
    })
    ipc.on('Page4', ()=>{
        console.log('Page 4 clicked')
    })

    let result
    
    ipc.on('folderSelect', async (event, arg) => {
        // open windows dialog
        result = await dialog.showOpenDialog(win, {
            properties: ['openDirectory']
          })
        
        console.log('path: ' + result.filePaths)
        loadDirectory = result.filePaths
        let fileNum = 0;
        // scan directory for number of slp files
        fs.readdir(String(loadDirectory), function (err, files) {
            // handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            // listing all files using forEach
            files.forEach(function (file) {
                // check that its a slippi replay file
                let name = String(file)
                piece = name.split('.')
                if(piece.length > 1 && piece[1] == 'slp'){
                    fileNum += 1;
                }
            });
            // send the directory and number of files
            win.webContents.send('retrievedFolder', [loadDirectory, fileNum])
        });
        
    })

    ipc.on('analyze', ()=>{
        console.log('Analyzing...')
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'analyze.html'),
            protocol: 'file',
            slashes: true
        }))
    })

    ipc.on('homeRequest', ()=>{
        console.log('Page 1 clicked')
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
    })

    /* -- Main Analyze Function -- */
    // In the end this will have arguments sent from the analyze js file, and then
    // the arguments will be considered while building the data and looking into the files.
    // So far this only shows that I can loop through all the slp files in the directory
    ipc.on('submitAnalyze', ()=>{
        fs.readdir(String(loadDirectory), function (err, files) {
            if (err) {
              console.error("Could not list the directory.", err);
              process.exit(1);
            }
            files.forEach(function (file, index) {
                console.log(String(file))
                let game = new SlippiGame("" + loadDirectory + "\\" + String(file))
                const frames = game.getFrames();
                console.log(frames[0].players);
            });
        })
    })

    win.on('maximize', ()=>{
        win.webContents.send('isMaximized')
    })
    win.on('unmaximize', ()=>{
        win.webContents.send('isRestored')
    })

    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {label: 'Open Dev',
                 click() {
                    win.webContents.openDevTools()
                 }},
                {type: 'separator'},
                {label: 'Close Dev',
                click() {
                    win.webContents.closeDevTools()
                 }},
                {type: 'separator'},
                {label: 'Exit', 
                    click() { 
                        app.quit() 
                    }
                }
            ]
        },
        {
            label: 'Menu2',
            submenu: [
                {label: 'Do Thing2',
                 submenu: [
                    {label: 'Woops'}
                ]},
                {type: 'separator'},
                {label: 'Do Thing Two2'},
                {type: 'separator'},
                {label: 'Exit2', 
                    click() { 
                        app.quit() 
                    }
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', () => {
    if(win == null) {
        createWindow()
    }
})