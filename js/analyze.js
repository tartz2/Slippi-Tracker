const { ipcRenderer } = require('electron')
const { SlippiGame } = require("@slippi/slippi-js")
const fs = require('fs')
const maxResBtn = document.getElementById('maxResBtn')
const leftMenuBtns = document.getElementById('leftMenuBtns')
const homeElement = document.getElementById('homeButton')
const menuToggle = document.getElementById('menuToggle')
const minimizeBtn = document.getElementById('minimizeBtn')
homeElement.style.visibility = 'hidden'
leftMenuBtns.style.visibility = 'hidden'
const page1 = document.getElementById('page1')
const page2 = document.getElementById('page2')
const page3 = document.getElementById('page3')
const page4 = document.getElementById('page4')
const home = document.getElementById('homeBtn')
const submit = document.getElementById('submit')
const mySidebar = document.getElementById('mySidebar')
const ipc = ipcRenderer
var isLeftMenuActive = false
var path = "C:\Users\Thomas Artz\Documents\Slippi"

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
home.addEventListener('click', ()=>{
    ipc.send('homeRequest')
})
submit.addEventListener('click', ()=>{
    ipc.send('submitAnalyze')
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