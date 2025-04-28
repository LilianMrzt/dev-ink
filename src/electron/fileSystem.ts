import * as fs from 'fs'
import * as path from 'path'
import { FolderEntry } from '../interfaces/types/FolderEntry'

const HIDDEN_FILES_AND_FOLDERS = [
    '.git',
    '.DS_Store'
]

const readFolderChildren = (dirPath: string): FolderEntry[] => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })

    const visibleEntries = entries
        .filter((entry) => {
            const isHidden = entry.name.startsWith('.') || HIDDEN_FILES_AND_FOLDERS.includes(entry.name)
            const isSelfNamedFolder = entry.isDirectory() && entry.name === path.basename(dirPath)
            return !isHidden && !isSelfNamedFolder
        })
        .sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1
            if (!a.isDirectory() && b.isDirectory()) return 1
            return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
        })

    return visibleEntries.map((entry) => {
        return {
            name: entry.name,
            path: path.join(dirPath, entry.name),
            isDirectory: entry.isDirectory(),
            children: entry.isDirectory() ? readFolderChildren(path.join(dirPath, entry.name)) : undefined
        }
    })
}

export const readFolderStructure = (dirPath: string): FolderEntry[] => {
    return [{
        name: path.basename(dirPath),
        path: dirPath,
        isDirectory: true,
        children: readFolderChildren(dirPath)
    }]
}
