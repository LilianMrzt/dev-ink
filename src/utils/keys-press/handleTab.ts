import { KeyboardEvent } from 'react'

/**
 * Gestion de la tabulation
 * @param e
 * @param code
 * @param textarea
 * @param setCode
 * @param onChange
 * @param fixtureId
 */
export const handleTab = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    code: string,
    textarea: HTMLTextAreaElement,
    setCode: (code: string) => void,
    onChange: (id: string, value: string) => void,
    fixtureId: string
) => {
    e.preventDefault()

    const { selectionStart, selectionEnd } = textarea
    const before = code.substring(0, selectionStart)
    const after = code.substring(selectionEnd)
    const tab = '\t'

    const newValue = before + tab + after
    setCode(newValue)
    onChange(fixtureId, newValue)

    requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + tab.length
    })
}
