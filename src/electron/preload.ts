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
    },
    readFile: (filePath: string) => {
        return ipcRenderer.invoke('read-file', filePath)
    },
    writeFile: (filePath: string, content: string) => {
        return ipcRenderer.invoke('write-file', filePath, content)
    },
    createFile: (filePath: string) => {
        return ipcRenderer.invoke('create-file', filePath)
    },
    createFolder: (folderPath: string) => {
        return ipcRenderer.invoke('create-folder', folderPath)
    },
    deletePath: (path: string) => {
        return ipcRenderer.invoke('delete-path', path)
    },
    refactorPathReferences: (rootDir: string, oldPath: string, newPath: string) => {
        return ipcRenderer.invoke('refactor-path-references', rootDir, oldPath, newPath)
    },
    movePath: (source: string, dest: string) => {
        return ipcRenderer.invoke('move-path', source, dest)
    }
})
