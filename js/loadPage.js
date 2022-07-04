const { ipcRenderer } = require('electron')
const ipc = ipcRenderer
const maxResBtn = document.getElementById('maxResBtn')
const leftMenuBtns = document.getElementById('leftMenuBtns')
const homeElement = document.getElementById('homeButton')
// const menuToggle = document.getElementById('menuToggle')
homeElement.style.visibility = 'hidden'
leftMenuBtns.style.visibility = 'hidden'
const menuToggle = document.getElementById('menuToggle')
const closeBtn = document.getElementById('closeBtn')
const minimizeBtn = document.getElementById('minimizeBtn')
const page1 = document.getElementById('page1')
const page2 = document.getElementById('page2')
const page3 = document.getElementById('page3')
const page4 = document.getElementById('page4')
const home = document.getElementById('homeBtn')
const mySidebar = document.getElementById('mySidebar')

const folderSelect = document.getElementById('folderSelect')
const folderSelectText = document.getElementById('folderSelectText')
const analyzeButton = document.getElementById('analyzeButton')
const fileWarning = document.getElementById('fileWarning')
var isLeftMenuActive = false
var canAnalyze = false

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
    
    if(args[0] == '')
        folderSelectText.textContent = 'No Folder'
    else {
        let trim = String(args[0])
        piece = trim.split('\\')
        folderSelectText.textContent = '.../' + piece[piece.length - 1] + '/'
        if(args[1] == 0){
            fileWarning.style.color = '#DC143C'
            fileWarning.textContent = 'Warning! No slippi replay files (.slp) detected!'
            analyzeButton.style.borderColor = '#DC143C'
            canAnalyze = false
        } else {
            fileWarning.style.color = '#949AA7'
            fileWarning.textContent = '' + args[1] + ' file(s) detected'
            analyzeButton.style.borderColor = '#50C878'
            canAnalyze = true
        }
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
analyzeButton.addEventListener('click', ()=>{
    if(canAnalyze){
        ipc.send('analyze')
    }
})


menuToggle.addEventListener('click', ()=>{
    if(isLeftMenuActive){
        mySidebar.style.width = '0%'
        isLeftMenuActive = false
        leftMenuBtns.style.visibility = 'hidden'
        homeElement.style.visibility = 'hidden'
    } else {
        mySidebar.style.width = '30%'
        isLeftMenuActive = true
        leftMenuBtns.style.visibility = 'visible'
        leftMenuBtns.style.alignSelf = 'center'
        homeElement.style.visibility = 'visible'
    }
})