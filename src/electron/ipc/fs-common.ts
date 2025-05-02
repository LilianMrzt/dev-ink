import { ipcMain } from 'electron'
import * as fs from 'fs'

export function registerFSCommonHandlers(){
    ipcMain.handle('delete-path', async (_event, targetPath: string) => {
        try {
            if (!fs.existsSync(targetPath)) {
                return { success: false, error: 'Le chemin n’existe pas.' }
            }

            const stats = fs.statSync(targetPath)

            if (stats.isDirectory()) {
                fs.rmSync(targetPath, { recursive: true, force: true })
            } else {
                fs.unlinkSync(targetPath)
            }

            return { success: true }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error)
            return { success: false, error: msg }
        }
    })
}
