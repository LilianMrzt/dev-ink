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

        if (!lastFolder || !fs.existsSync(lastFolder)) {
            return null
        }

        const structure = readFolderStructure(lastFolder)

        setSetting('lastOpenedFolder', lastFolder)

        return { folderPath: lastFolder, structure }
    })

    ipcMain.handle('read-file', async (_event, filePath: string) => {
        try {
            return fs.readFileSync(filePath, 'utf-8')
        } catch (error) {
            console.error('Failed to read file:', filePath, error)
            return ''
        }
    })

    ipcMain.handle('write-file', async (_event, filePath: string, content: string) => {
        try {
            fs.writeFileSync(filePath, content, 'utf-8')
            return { success: true }
        } catch (error: unknown) {
            console.error('Failed to write file:', filePath, error)
            const errorMessage = error instanceof Error ? error.message : String(error)
            return { success: false, error: errorMessage }
        }

    })
}
