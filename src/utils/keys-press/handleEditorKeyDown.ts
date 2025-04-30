import { handleTab } from './handleTab'
import { handleAutoPairing } from './handleAutoPairing'
import { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { handlePairDeletion } from '@utils/keys-press/handlePairDeletion'
import { handleShiftTab } from '@utils/keys-press/handleShiftTab'
import { handleUndoRedo } from '@utils/keys-press/handleUndoRedo'
import { HistoryState } from '@interfaces/types/History'
import { handleDuplicateLine } from '@utils/keys-press/handleDuplicateLine'
import { handleSave } from '@utils/keys-press/HandleSave'

/**
 * Gestion de la pression des touches du clavier
 * @param e
 * @param code
 * @param textarea
 * @param setCode
 * @param onChange
 * @param fileId
 * @param history
 * @param markFileAsSaved
 */
export const handleEditorKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    code: string,
    textarea: HTMLTextAreaElement | null,
    setCode: Dispatch<SetStateAction<string>>,
    onChange: (id: string, value: string) => void,
    fileId: string,
    history: HistoryState,
    markFileAsSaved: (id: string) => void
) => {
    if (!textarea) return

    if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'y')) {
        handleUndoRedo(e, code, history, textarea, setCode, onChange, fileId)
        return
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave(code, fileId)
            .then(() => {
                markFileAsSaved(fileId)
            })
        return
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault()
        handleDuplicateLine(textarea, code, setCode, onChange, fileId)
        return
    }

    if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault()
        handleShiftTab(e, code, textarea, setCode, onChange, fileId, history)
        return
    }

    if (e.key === 'Tab') {
        handleTab(e, code, textarea, setCode, onChange, fileId, history)
        return
    }

    if (handleAutoPairing(e, code, textarea, setCode, onChange, fileId)) {
        return
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
        if (handlePairDeletion(e, code, textarea, setCode, onChange, fileId)) {
            return
        }
    }
}
