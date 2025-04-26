import { MenuItemConstructorOptions } from 'electron'

export const menuTemplate: MenuItemConstructorOptions[] = [
    {
        label: 'File',
        submenu: [
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
