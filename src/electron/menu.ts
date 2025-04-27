import { Menu, BrowserWindow } from 'electron'
import { menuTemplate } from './ElectronMenuTemplate'

export function setupMenu(mainWindow: BrowserWindow){
    const isMac = process.platform === 'darwin'

    if (isMac) {
        const menu = Menu.buildFromTemplate(menuTemplate)
        Menu.setApplicationMenu(menu)
    } else {
        mainWindow.setMenu(null)
    }
}
