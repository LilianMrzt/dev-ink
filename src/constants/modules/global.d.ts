import { FolderEntry } from '@interfaces/types/FolderEntry'

export {}

declare global {
    interface Window {
        electronAPI?: {
            setTitleBarColors: (backgroundColor: string, symbolColor: string) => void,
            onFullScreenChanged: (isFullScreen: (fullScreen) => void) => void,
            selectFolder: () => Promise<{ folderPath: string, structure: FolderEntry[] } | null>,
            getLastOpenedFolder: () => Promise<{ folderPath: string; structure: FolderEntry[] } | null>,
            onOpenFolderDialog: (callback: () => void) => void,
            readFile: (filePath: string) => Promise<string>,
            writeFile: (filePath: string, content: string) => Promise<{ success: boolean; error?: string }>,
            createFile: (filePath: string) => Promise<{ success: boolean; error?: string }>,
            createFolder: (folderPath: string) => Promise<{ success: boolean; error?: string }>,
            deletePath: (targetPath: string) => Promise<{ success: boolean; error?: string }>
        }
    }
}
