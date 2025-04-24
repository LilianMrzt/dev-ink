import { handleTab } from './handleTab'
import { handleAutoPairing } from './handleAutoPairing'
import { KeyboardEvent } from 'react'
import { handlePairDeletion } from '@utils/keys-press/handlePairDeletion'
import { handleShiftTab } from '@utils/keys-press/handleShiftTab'

/**
 * Gestion de la pression des touches du clavier
 * @param e
 * @param code
 * @param textarea
 * @param setCode
 * @param onChange
 * @param fixtureId
 */
export const handleEditorKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    code: string,
    textarea: HTMLTextAreaElement | null,
    setCode: (code: string) => void,
    onChange: (id: string, value: string) => void,
    fixtureId: string
) => {
    if (!textarea) return

    if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault()
        handleShiftTab(e, code, textarea, setCode, onChange, fixtureId)
        return
    }

    if (e.key === 'Tab') {
        handleTab(e, code, textarea, setCode, onChange, fixtureId)
        return
    }

    if (handleAutoPairing(e, code, textarea, setCode, onChange, fixtureId)) {
        return
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
        if (handlePairDeletion(e, code, textarea, setCode, onChange, fixtureId)) {
            return
        }
    }
}
