import { handleTab } from './handleTab'
import { handleAutoPairing } from './handleAutoPairing'
import { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { handlePairDeletion } from '@utils/keys-press/handlePairDeletion'
import { handleShiftTab } from '@utils/keys-press/handleShiftTab'
import { handleUndoRedo } from '@utils/keys-press/handleUndoRedo'
import { HistoryState } from '@interfaces/types/History'
import { handleDuplicateLine } from '@utils/keys-press/handleDuplicateLine'

/**
 * Gestion de la pression des touches du clavier
 * @param e
 * @param code
 * @param textarea
 * @param setCode
 * @param onChange
 * @param fixtureId
 * @param history
 */
export const handleEditorKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    code: string,
    textarea: HTMLTextAreaElement | null,
    setCode: Dispatch<SetStateAction<string>>,
    onChange: (id: string, value: string) => void,
    fixtureId: string,
    history: HistoryState
) => {
    if (!textarea) return

    if (e.ctrlKey && (e.key === 'z' || e.key === 'y')) {
        handleUndoRedo(e, code, history, textarea, setCode, onChange, fixtureId)
        return
    }

    if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        return
    }

    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault()
        handleDuplicateLine(textarea, code, setCode, onChange, fixtureId)
        return
    }

    if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault()
        handleShiftTab(e, code, textarea, setCode, onChange, fixtureId, history)
        return
    }

    if (e.key === 'Tab') {
        handleTab(e, code, textarea, setCode, onChange, fixtureId, history)
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
