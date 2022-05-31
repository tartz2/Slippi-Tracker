const {app, BrowserWindow, ipcMain, Menu} = require('electron')
const { meanBy } = require('lodash')
const path = require('path')
const url = require('url')
const ipc = ipcMain
let win

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

    // win.webContents.openDevTools()

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