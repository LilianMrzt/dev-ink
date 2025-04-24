import { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { keyPairs } from '@constants/keys-actions/keyPairs'

/**
 * Ajoute un second caractere lors de l'ajout d'un des caratceres définis dans les paires
 * @param e
 * @param code
 * @param textarea
 * @param setCode
 * @param onChange
 * @param fixtureId
 */
export const handleAutoPairing = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    code: string,
    textarea: HTMLTextAreaElement,
    setCode: Dispatch<SetStateAction<string>>,
    onChange: (id: string, value: string) => void,
    fixtureId: string
) => {
    const pair = keyPairs[e.key]
    if (!pair) return false

    e.preventDefault()

    const { selectionStart, selectionEnd } = textarea
    const before = code.slice(0, selectionStart)
    const after = code.slice(selectionEnd)

    const newCode = before + e.key + pair + after
    setCode(newCode)
    onChange(fixtureId, newCode)

    requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1
    })

    return true
}
