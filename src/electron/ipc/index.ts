import { BrowserWindow } from 'electron'
import { registerGeneralHandlers } from './general'
import { registerFolderHandlers } from './folder'
import { registerFileHandlers } from './file'

export function setupIpcHandlers(mainWindow: BrowserWindow){
    registerGeneralHandlers(mainWindow)
    registerFolderHandlers()
    registerFileHandlers()
}
