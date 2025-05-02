import { ipcMain } from 'electron'
import * as fs from 'fs'

export function registerFileHandlers(){
    ipcMain.handle('read-file', (_event, filePath: string) => {
        try {
            return fs.readFileSync(filePath, 'utf-8')
        } catch (error) {
            console.error('Failed to read file:', filePath, error)
            return ''
        }
    })

    ipcMain.handle('write-file', (_event, filePath: string, content: string) => {
        try {
            fs.writeFileSync(filePath, content, 'utf-8')
            return { success: true }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error)
            return { success: false, error: msg }
        }
    })

    ipcMain.handle('create-file', (_event, filePath: string) => {
        try {
            fs.writeFileSync(filePath, '')
            return { success: true }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error)
            return { success: false, error: msg }
        }
    })
}
