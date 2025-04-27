import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { FolderEntry } from '@interfaces/types/FolderEntry'

interface FolderContextProps {
    openFolder: { folderPath: string; structure: FolderEntry[] } | null;
    openNewFolder: () => Promise<void>;
}

const FolderContext = createContext<FolderContextProps | undefined>(undefined)

export const FolderProvider = ({ children }: { children: ReactNode }) => {
    const [openFolder, setOpenFolder] = useState<{ folderPath: string; structure: FolderEntry[] } | null>(null)

    const openNewFolder = async () => {
        const folderData = await window.electronAPI?.selectFolder()

        if (folderData) {
            setOpenFolder(await folderData)
        }
    }

    return (
        <FolderContext.Provider value={{ openFolder, openNewFolder }}>
            {children}
        </FolderContext.Provider>
    )
}

export const useFolder = () => {
    const context = useContext(FolderContext)
    if (!context) {
        throw new Error('useFolder must be used within a FolderProvider')
    }
    return context
}
