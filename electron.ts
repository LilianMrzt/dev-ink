import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

let mainWindow: BrowserWindow | null = null

function createWindow(): void{
    mainWindow = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            contextIsolation: true
        }
    })

    const startUrl = url.format({
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
