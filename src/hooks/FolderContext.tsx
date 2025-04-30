import React, { createContext, Dispatch, type ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { FolderEntry } from '@interfaces/types/FolderEntry'
import { useWindowState } from '@hooks/useWindowState'

interface FolderContextProps {
    openFolder: { folderPath: string; structure: FolderEntry[] } | null;
    openNewFolder: () => Promise<void>;
    setOpenFolder: Dispatch<SetStateAction<{ folderPath: string; structure: FolderEntry[] } | null>>;
}

const FolderContext = createContext<FolderContextProps | undefined>(undefined)

export const FolderProvider = ({ children }: { children: ReactNode }) => {
    const [openFolder, setOpenFolder] = useState<{ folderPath: string; structure: FolderEntry[] } | null>(null)

    const { isMac } = useWindowState()

    /**
     * Ouvrir un nouveau dossier dans le drawer
     */
    const openNewFolder = async () => {
        const folderData = await window.electronAPI?.selectFolder()

        if (folderData) {
            setOpenFolder(await folderData)
        }
    }

    /**
     * Verifier le dernier dossier ouvert et le réouvrir
     */
    useEffect(() => {
        window.electronAPI?.getLastOpenedFolder()
            .then((res) => {
                if (res) {
                    setOpenFolder(res)
                }
            })

        if (isMac) {
            const handler = async () => {
                await openNewFolder()
            }

            window.electronAPI?.onOpenFolderDialog(handler)
        }
    }, [isMac])

    return (
        <FolderContext.Provider value={{
            openFolder,
            openNewFolder,
            setOpenFolder
        }}>
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
