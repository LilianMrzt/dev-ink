import * as fs from 'fs'
import * as path from 'path'

/**
 * Met à jour tous les fichiers du projet contenant l'ancien chemin (ou partie de chemin) par le nouveau
 * @param rootDir
 * @param oldPath
 * @param newPath
 */
export const refactorPathReferences = (rootDir: string, oldPath: string, newPath: string): string[] => {
    const affectedFiles: string[] = []

    const isFileEligible = (filePath: string) => {
        return /\.(ts|tsx|js|jsx|json|css|scss|md)$/.test(filePath)
    }

    const walk = (dir: string) => {
        for (const name of fs.readdirSync(dir)) {
            const fullPath = path.join(dir, name)
            const stats = fs.statSync(fullPath)

            if (stats.isDirectory()) {
                walk(fullPath)
            } else if (isFileEligible(fullPath)) {
                const content = fs.readFileSync(fullPath, 'utf-8')
                if (content.includes(oldPath)) {
                    const updated = newPath === ''
                        ? content.split(oldPath).join('// deleted: ' + oldPath)
                        : content.split(oldPath).join(newPath)

                    fs.writeFileSync(fullPath, updated, 'utf-8')
                    affectedFiles.push(fullPath)
                }
            }
        }
    }

    walk(rootDir)
    return affectedFiles
}
