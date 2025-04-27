import * as fs from 'fs'
import * as path from 'path'
import { FolderEntry } from '../interfaces/types/FolderEntry'

const HIDDEN_FILES_AND_FOLDERS = [
    '.git',
    '.DS_Store'
]

export function readFolderStructure(dirPath: string): FolderEntry[]{
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })

    const visibleEntries = entries
        .filter(entry => {
            const isHidden = entry.name.startsWith('.') || HIDDEN_FILES_AND_FOLDERS.includes(entry.name)
            return !isHidden
        })
        .sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1
            if (!a.isDirectory() && b.isDirectory()) return 1
            return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
        })

    return [{
        name: path.basename(dirPath),
        path: dirPath,
        isDirectory: true,
        children: visibleEntries.map(entry => {
            return {
                name: entry.name,
                path: path.join(dirPath, entry.name),
                isDirectory: entry.isDirectory(),
                children: entry.isDirectory() ? readFolderStructure(path.join(dirPath, entry.name)) : undefined
            }
        })
    }]
}
