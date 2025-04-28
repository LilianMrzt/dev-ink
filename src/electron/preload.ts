import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
    setTitleBarColors: (backgroundColor: string, symbolColor: string) => {
        ipcRenderer.send('set-title-bar-colors', { backgroundColor, symbolColor })
    },
    onFullScreenChanged: (callback: (isFullScreen: boolean) => void) => {
        ipcRenderer.on('fullscreen-changed', (_event, isFullScreen) => {
            return callback(isFullScreen)
        })
    },
    selectFolder: () => {
        return ipcRenderer.invoke('select-folder')
    },
    getLastOpenedFolder: () => {
        return ipcRenderer.invoke('get-last-opened-folder')
    },
    onOpenFolderDialog: (callback: () => void) => {
        ipcRenderer.on('open-folder-dialog', callback)
    }
})
