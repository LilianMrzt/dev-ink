import { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { redo, undo } from '@utils/editorHistory'
import { EditType, HistoryState } from '@interfaces/types/History'

/**
 * Gestion du undo/redo+
 *
 * @param e
 * @param code
 * @param history
 * @param textarea
 * @param setCode
 * @param onChange
 * @param fixtureId
 */
export const handleUndoRedo = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    code: string,
    history: HistoryState,
    textarea: HTMLTextAreaElement,
    setCode: Dispatch<SetStateAction<string>>,
    onChange: (id: string, value: string) => void,
    fixtureId: string
) => {
    const isUndo = e.ctrlKey && e.key === 'z'
    const isRedo = e.ctrlKey && e.key === 'y'

    if (!isUndo && !isRedo) return

    e.preventDefault()

    const currentSnapshot = {
        code,
        cursor: textarea.selectionStart,
        type: 'manual' as EditType,
        timestamp: Date.now()
    }

    const newSnapshot = isUndo
        ? undo(history, currentSnapshot)
        : redo(history)

    if (newSnapshot) {
        setCode(newSnapshot.code)
        onChange(fixtureId, newSnapshot.code)

        requestAnimationFrame(() => {
            textarea.selectionStart = textarea.selectionEnd = newSnapshot.cursor
        })
    }
}
