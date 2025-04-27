import * as fs from 'fs'
import * as path from 'path'
import { FolderEntry } from '../interfaces/types/FolderEntry'

export function readFolderStructure(dirPath: string): FolderEntry[]{
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })

    return [{
        name: path.basename(dirPath),
        path: dirPath,
        isDirectory: true,
        children: entries.map(entry => {
            return {
                name: entry.name,
                path: path.join(dirPath, entry.name),
                isDirectory: entry.isDirectory(),
                children: entry.isDirectory() ? readFolderStructure(path.join(dirPath, entry.name)) : undefined
            }
        })
    }]
}
