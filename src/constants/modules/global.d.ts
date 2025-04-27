import { FolderEntry } from '@interfaces/types/FolderEntry'

export {}

declare global {
    interface Window {
        electronAPI?: {
            setTitleBarColors: (backgroundColor: string, symbolColor: string) => void,
            onFullScreenChanged: (isFullScreen: (fullScreen) => void) => void,
            selectFolder: () => Promise<{ folderPath: string, structure: FolderEntry[] } | null>,
            getLastOpenedFolder: () => Promise<{ folderPath: string; structure: FolderEntry[] } | null>
        }
    }
}
