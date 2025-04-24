import { KeyboardEvent } from 'react'
import { keyPairs } from '@constants/keys-actions/keyPairs'

/**
 * Supprime les deux éléments d'une paire en même temps
 * @param e
 * @param code
 * @param textarea
 * @param setCode
 * @param onChange
 * @param fixtureId
 */
export const handlePairDeletion = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    code: string,
    textarea: HTMLTextAreaElement,
    setCode: (code: string) => void,
    onChange: (id: string, value: string) => void,
    fixtureId: string
) => {
    const { selectionStart, selectionEnd } = textarea
    if (selectionStart !== selectionEnd) return false

    const before = code.slice(0, selectionStart)
    const after = code.slice(selectionEnd)

    const prevChar = code[selectionStart - 1]
    const nextChar = code[selectionStart]

    if (e.key === 'Backspace' && keyPairs[prevChar] === nextChar) {
        e.preventDefault()
        const newCode = before.slice(0, -1) + after.slice(1)
        setCode(newCode)
        onChange(fixtureId, newCode)
        requestAnimationFrame(() => {
            textarea.selectionStart = textarea.selectionEnd = selectionStart - 1
        })
        return true
    }

    if (e.key === 'Delete' && keyPairs[code[selectionStart]] && keyPairs[code[selectionStart]] === code[selectionStart + 1]) {
        e.preventDefault()
        const newCode = before + after.slice(2)
        setCode(newCode)
        onChange(fixtureId, newCode)
        requestAnimationFrame(() => {
            textarea.selectionStart = textarea.selectionEnd = selectionStart
        })
        return true
    }

    return false
}
