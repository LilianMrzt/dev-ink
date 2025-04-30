import { FolderEntry } from '@interfaces/types/FolderEntry'

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
    return entry.isDirectory
        ? normalizePath(entry.path)
        : normalizePath(entry.path.substring(0, entry.path.lastIndexOf('/')))
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
