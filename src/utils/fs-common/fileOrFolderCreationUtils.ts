import { FolderEntry } from '@interfaces/types/FolderEntry'
import { Dispatch, SetStateAction } from 'react'
import { File } from '@interfaces/types/File'

/**
 * Fait en sorte que le path soit en une seule et unique représentation
 * @param p
 */
export const normalizePath = (p: string): string => {
    return p.replace(/\\/g, '/')
}

/**
 * Récupère le dossier cible dans lequel créer un nouvel élément
 * @param entry
 */
export const getTargetDir = (entry: FolderEntry): string => {
    const normalizedPath = normalizePath(entry.path)

    if (entry.isDirectory) {
        return normalizedPath
    }

    const lastSlashIndex = normalizedPath.lastIndexOf('/')
    if (lastSlashIndex === -1) {
        return normalizedPath
    }

    return normalizedPath.substring(0, lastSlashIndex)
}

/**
 * Verifie si le nom de l'item est valide
 * @param name
 * @param type
 */
export const isValidName = (name: string, type: 'file' | 'folder'): boolean => {
    const trimmed = name.trim()
    if (trimmed === '') return false
    return !(type === 'folder' && trimmed.includes('.'))

}

/**
 * Sanitize le nom de l'item
 * @param name
 * @param type
 */
export const sanitizeName = (name: string, type: 'file' | 'folder'): string => {
    let clean = name.trimStart()
    if (type === 'file' && !clean.includes('.')) {
        clean += '.txt'
    }
    return clean
}

/**
 * Crée un fichier ou dossier dans le répertoire de l'element actif du drawer
 * @param name
 * @param type
 * @param openFolder
 * @param activeItem
 * @param setOpenFolder
 * @param openFile
 */
export const handleCreateFolderOrFile = async (
    name: string,
    type: 'file' | 'folder',
    openFolder: { folderPath: string; structure: FolderEntry[] } | null,
    activeItem: FolderEntry | null,
    setOpenFolder: Dispatch<SetStateAction<{ folderPath: string; structure: FolderEntry[] } | null>>,
    openFile: (file: File) => void
) => {
    if (!openFolder || !activeItem) return

    const cleanName = sanitizeName(name, type)
    if (!isValidName(cleanName, type)) {
        console.warn('Nom invalide.')
        return
    }

    const fullPath = normalizePath(`${getTargetDir(activeItem)}/${cleanName}`)

    const exists = openFolder.structure.some((entry) => {
        return entry.path === fullPath
    })
    if (exists) {
        console.warn('Un élément existe déjà à cet emplacement.')
        return
    }

    const result =
        type === 'file'
            ? await window.electronAPI?.createFile(fullPath)
            : await window.electronAPI?.createFolder(fullPath)

    if (result?.success) {
        const refreshed = await window.electronAPI?.getLastOpenedFolder()
        if (refreshed) {
            setOpenFolder(refreshed)

            if (type === 'file') {
                const content = await window.electronAPI?.readFile(fullPath) ?? ''
                openFile({
                    id: fullPath,
                    name: cleanName,
                    path: fullPath,
                    content,
                    isModified: false
                })
            }
        }
    }
}
