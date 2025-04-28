import React, { createContext, useContext, type FC, type ReactNode, useState, Dispatch, SetStateAction } from 'react'
import { File } from '@interfaces/types/File'

interface EditorContextProps {
    openedFiles: File[]
    setOpenedFiles: Dispatch<SetStateAction<File[]>>
    activeFileId: string | null
    setActiveFileId: Dispatch<SetStateAction<string | null>>
    handleActiveFileChange: (id: string, newValue: string | undefined) => void
    openFile: (file: File) => void
    closeFile: (fileId: string) => void
    activeFile: File
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined)

export const EditorProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [openedFiles, setOpenedFiles] = useState<File[]>([])
    const [activeFileId, setActiveFileId] = useState<string | null>(null)

    // TODO: Retirer le !
    const activeFile = openedFiles.find((f) => {
        return f.id === activeFileId
    })!

    /**
     * Gestion du changement du fichier actif
     * @param id
     * @param newValue
     */
    const handleActiveFileChange = (id: string, newValue: string | undefined) => {
        setOpenedFiles((prev) => {
            return prev.map((file) => {
                return (file.id === id ? {
                    ...file,
                    content: newValue || ''
                } : file)
            })
        })
    }

    /**
     * Gestion de l'ouverture d'un fichier
     * @param file
     */
    const openFile = (file: File) => {
        setOpenedFiles((prev) => {
            const alreadyOpened = prev.some((f) => {
                return f.id === file.id
            })
            if (alreadyOpened) {
                return prev
            }
            return [...prev, file]
        })
        setActiveFileId(file.id)
    }

    /**
     * Gestion de la fermeture d'un fichier
     * @param fileId
     */
    const closeFile = (fileId: string) => {
        setOpenedFiles((prev) => {
            const newFiles = prev.filter((file) => {
                return file.id !== fileId
            })

            setActiveFileId((currentId) => {
                if (currentId === fileId) {
                    if (newFiles.length > 0) {
                        return newFiles[newFiles.length - 1].id
                    } else {
                        return null
                    }
                }
                return currentId
            })

            return newFiles
        })
    }

    return (
        <EditorContext.Provider
            value={{
                openedFiles,
                setOpenedFiles,
                activeFileId,
                setActiveFileId,
                handleActiveFileChange,
                openFile,
                closeFile,
                activeFile
            }}
        >
            {children}
        </EditorContext.Provider>
    )
}

export const useEditor = (): EditorContextProps => {
    const context = useContext(EditorContext)
    if (!context) {
        throw new Error('useEditor must be used within an EditorProvider')
    }
    return context
}
