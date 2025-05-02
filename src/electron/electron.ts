import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'
import { setupMenu } from './menu/menu'
import { loadSettings } from './settings'
import { setupIpcHandlers } from './ipc'

let mainWindow: BrowserWindow | null = null

function createWindow(): void{
    app.setName('Dev-Ink')

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        frame: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.on('enter-full-screen', () => {
        mainWindow?.webContents.send('fullscreen-changed', true)
    })

    mainWindow.on('leave-full-screen', () => {
        mainWindow?.webContents.send('fullscreen-changed', false)
    })

    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F11') {
            event.preventDefault()
        }
    })

    setupMenu(mainWindow)
    setupIpcHandlers(mainWindow)

    const isDev = !app.isPackaged

    const startUrl = isDev
        ? 'http://localhost:3000'
        : url.format({
            pathname: path.join(__dirname, '../build/index.html'),
            protocol: 'file:',
            slashes: true
        })

    mainWindow.loadURL(startUrl)

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(() => {
    loadSettings()
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
