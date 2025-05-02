import { Dispatch, SetStateAction } from 'react'
import { FolderEntry } from '@interfaces/types/FolderEntry'

export const handleDelete = async (
    path: string,
    setOpenFolder: Dispatch<SetStateAction<{ folderPath: string; structure: FolderEntry[] } | null>>
) => {
    const result = await window.electronAPI?.deletePath(path)

    if (result?.success) {
        const refreshed = await window.electronAPI?.getLastOpenedFolder()
        if (refreshed) {
            setOpenFolder(refreshed)
        }
    } else {
        console.error('Failed to delete:', result?.error)
    }
}
