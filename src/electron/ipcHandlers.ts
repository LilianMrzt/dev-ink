import { ipcMain, BrowserWindow, dialog } from 'electron'
import { readFolderStructure } from './fileSystem'
import { getSetting, setSetting } from './settings'
import * as fs from 'fs'

export function setupIpcHandlers(mainWindow: BrowserWindow){
    ipcMain.handle('ping', async () => {
        return 'pong'
    })

    ipcMain.on('set-title-bar-colors', (event, colors: { backgroundColor: string; symbolColor: string }) => {
        if (mainWindow && mainWindow.setTitleBarOverlay) {
            mainWindow.setTitleBarOverlay({
                color: colors.backgroundColor,
                symbolColor: colors.symbolColor
            })
        }
    })

    ipcMain.handle('select-folder', () => {
        const result = dialog.showOpenDialogSync({ properties: ['openDirectory'] })

        if (!result || result.length === 0) {
            return null
        }

        const folderPath = result[0]

        const structure = readFolderStructure(folderPath)

        setSetting('lastOpenedFolder', folderPath)

        return { folderPath, structure }
    })

    ipcMain.handle('get-last-opened-folder', async () => {
        const lastFolder = getSetting('lastOpenedFolder')
        if (lastFolder && fs.existsSync(lastFolder)) {
            const structure = await readFolderStructure(lastFolder)
            return { folderPath: lastFolder, structure }
        }
        return null
    })
}
