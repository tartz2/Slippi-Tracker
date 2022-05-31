const { ipcRenderer } = require('electron')
const maxResBtn = document.getElementById('maxResBtn')
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

closeBtn.addEventListener('click', ()=>{
    ipc.send('closeApp')
})

minimizeBtn.addEventListener('click', ()=>{
    ipc.send('minApp')
})

maxResBtn.addEventListener('click', ()=>{
    ipc.send('maxResApp')
})

menuToggle.addEventListener('click', ()=>{
    if(isLeftMenuActive){
        mySidebar.style.width = '0px'
        isLeftMenuActive = false
    } else {
        mySidebar.style.width = '30%'
        isLeftMenuActive = true
    }
})