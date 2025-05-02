import { BrowserWindow, MenuItemConstructorOptions } from 'electron'

export const menuTemplate: MenuItemConstructorOptions[] = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open Folder',
                accelerator: 'CmdOrCtrl+O',
                click: () => {
                    const focusedWindow = BrowserWindow.getFocusedWindow()
                    if (focusedWindow) {
                        focusedWindow.webContents.send('open-folder-dialog')
                    }
                }
            },
            { type: 'separator' },
            { role: 'quit', label: 'Exit' }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo', label: 'Undo' },
            { role: 'redo', label: 'Redo' },
            { type: 'separator' },
            { role: 'cut', label: 'Cut' },
            { role: 'copy', label: 'Copy' },
            { role: 'paste', label: 'Paste' },
            { role: 'delete', label: 'Delete' }
        ]
    }
]
