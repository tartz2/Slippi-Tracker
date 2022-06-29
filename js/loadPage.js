const { ipcRenderer } = require('electron')
const maxResBtn = document.getElementById('maxResBtn')
const leftMenuBtns = document.getElementById('leftMenuBtns')
const homeElement = document.getElementById('homeButton')
homeElement.style.visibility = 'hidden'
leftMenuBtns.style.visibility = 'hidden'
const page1 = document.getElementById('page1')
const page2 = document.getElementById('page2')
const page3 = document.getElementById('page3')
const page4 = document.getElementById('page4')
const home = document.getElementById('homeBtn')
const folderSelect = document.getElementById('folderSelect')
const folderSelectText = document.getElementById('folderSelectText')
const mySidebar = document.getElementById('mySidebar')
const ipc = ipcRenderer
var isLeftMenuActive = false

function changeMaxResBtn(isMaximizedApp){
    if(isMaximizedApp){
        maxResBtn.title = 'Restore'
        maxResBtn.classList.remove('maximizeBtn')
        maxResBtn.classList.add('restoreBtn')
    } else {
        maxResBtn.title = 'Maximize'
        maxResBtn.classList.remove('restoreBtn')
        maxResBtn.classList.add('maximizeBtn')
    }
}

ipc.on('isMaximized', ()=> { changeMaxResBtn(true) })
ipc.on('isRestored', ()=> { changeMaxResBtn(false) })
ipc.on('retrievedFolder', function (event, args){
    if(args == null)
    folderSelectText.textContent = 'No Folder'
    else {
        let trim = String(args)
        piece = trim.split('\\')
        folderSelectText.textContent = piece[piece.length - 1]
    }
    
})

closeBtn.addEventListener('click', ()=>{
    ipc.send('closeApp')
})

minimizeBtn.addEventListener('click', ()=>{
    ipc.send('minApp')
})

maxResBtn.addEventListener('click', ()=>{
    ipc.send('maxResApp')
})

page1.addEventListener('click', ()=>{
    ipc.send('Page1')
})
page2.addEventListener('click', ()=>{
    ipc.send('Page2')
})
page3.addEventListener('click', ()=>{
    ipc.send('Page3')
})
page4.addEventListener('click', ()=>{
    ipc.send('Page4')
})

folderSelect.addEventListener('click', ()=>{
    ipc.send('folderSelect')
})
home.addEventListener('click', ()=>{
    ipc.send('homeRequest')
})


menuToggle.addEventListener('click', ()=>{
    if(isLeftMenuActive){
        mySidebar.style.width = '0px'
        isLeftMenuActive = false
        leftMenuBtns.style.visibility = 'hidden'
        homeElement.style.visibility = 'hidden'
    } else {
        mySidebar.style.width = '30%'
        isLeftMenuActive = true
        leftMenuBtns.style.visibility = 'visible'
        homeElement.style.visibility = 'visible'
    }
})