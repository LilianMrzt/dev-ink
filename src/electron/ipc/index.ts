import { BrowserWindow } from 'electron'
import { registerGeneralHandlers } from './general'
import { registerFolderHandlers } from './folder'
import { registerFileHandlers } from './file'
import { registerFSCommonHandlers } from '../ipc/fs-common'

export function setupIpcHandlers(mainWindow: BrowserWindow){
    registerGeneralHandlers(mainWindow)
    registerFolderHandlers()
    registerFileHandlers()
    registerFSCommonHandlers()
}
