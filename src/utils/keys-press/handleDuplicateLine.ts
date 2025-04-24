import { SetStateAction } from 'react'

/**
 * Duplique la ligne sur laquelle se trouve le curseur.
 */
export const handleDuplicateLine = (
    textarea: HTMLTextAreaElement,
    code: string,
    setCode: (code: SetStateAction<string>) => void,
    onChange: (id: string, value: string) => void,
    fixtureId: string
) => {
    const { selectionStart } = textarea

    const lines = code.split('\n')

    let lineStart = 0
    let lineIndex = 0

    for (let i = 0; i < lines.length; i++) {
        const nextLineStart = lineStart + lines[i].length + 1
        if (selectionStart <= nextLineStart) {
            lineIndex = i
            break
        }
        lineStart = nextLineStart
    }

    const newLines = [...lines]
    newLines.splice(lineIndex + 1, 0, lines[lineIndex])

    const newCode = newLines.join('\n')

    let newCursor = 0
    for (let i = 0; i <= lineIndex + 1; i++) {
        newCursor += newLines[i].length + 1
    }

    setCode(newCode)
    onChange(fixtureId, newCode)

    requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = newCursor
    })
}
