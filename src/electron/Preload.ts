import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
    setTitleBarColors: (backgroundColor: string, symbolColor: string) => {
        ipcRenderer.send('set-title-bar-colors', { backgroundColor, symbolColor })
    }
})
