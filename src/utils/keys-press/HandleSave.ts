/**
 * Sauvegarde le fichier courant via le pont Electron
 * @param code
 * @param filePath
 */
export const handleSave = async (
    code: string,
    filePath: string | null
): Promise<void> => {
    if (!filePath || !window?.electronAPI?.writeFile) return

    try {
        const result = await window.electronAPI.writeFile(filePath, code)
        if (!result.success) {
            console.error('Erreur lors de la sauvegarde:', result.error)
        }
    } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err)
    }
}
