import { ipcMain, dialog } from 'electron'
import { readFolderStructure } from '../fileSystem'
import { getSetting, setSetting } from '../settings'
import * as fs from 'fs'

export function registerFolderHandlers(){
    ipcMain.handle('select-folder', () => {
        const result = dialog.showOpenDialogSync({ properties: ['openDirectory'] })

        if (!result || result.length === 0) return null

        const folderPath = result[0]
        const structure = readFolderStructure(folderPath)
        setSetting('lastOpenedFolder', folderPath)

        return { folderPath, structure }
    })

    ipcMain.handle('get-last-opened-folder', () => {
        const lastFolder = getSetting('lastOpenedFolder')
        if (!lastFolder || !fs.existsSync(lastFolder)) return null

        const structure = readFolderStructure(lastFolder)
        return { folderPath: lastFolder, structure }
    })

    ipcMain.handle('create-folder', (_event, folderPath: string) => {
        try {
            fs.mkdirSync(folderPath, { recursive: true })
            return { success: true }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error)
            return { success: false, error: msg }
        }
    })
}
