import { ipcMain, BrowserWindow } from 'electron'

export function registerGeneralHandlers(mainWindow: BrowserWindow){
    ipcMain.handle('ping', async () => {
        return 'pong'
    })

    ipcMain.on('set-title-bar-colors', (_event, colors: { backgroundColor: string; symbolColor: string }) => {
        if (mainWindow.setTitleBarOverlay) {
            mainWindow.setTitleBarOverlay({
                color: colors.backgroundColor,
                symbolColor: colors.symbolColor
            })
        }
    })
}
