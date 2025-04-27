import { ipcMain, BrowserWindow, dialog } from 'electron'
import { readFolderStructure } from './fileSystem'

export function setupIpcHandlers(mainWindow: BrowserWindow){
    ipcMain.on('set-title-bar-colors', (event, colors: { backgroundColor: string; symbolColor: string }) => {
        if (mainWindow && mainWindow.setTitleBarOverlay) {
            mainWindow.setTitleBarOverlay({
                color: colors.backgroundColor,
                symbolColor: colors.symbolColor
            })
        }
    })

    ipcMain.handle('select-folder', async () => {
        const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })

        if (result.canceled || result.filePaths.length === 0) {
            return null
        }

        const folderPath = result.filePaths[0]

        const structure = await readFolderStructure(folderPath)
        return { folderPath, structure }
    })
}
