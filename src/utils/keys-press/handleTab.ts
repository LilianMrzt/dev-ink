import { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { pushHistory, snapshot } from '@utils/editorHistory'
import { HistoryState } from '@interfaces/types/History'

/**
 * Gestion de la tabulation
 *
 * @param e
 * @param code
 * @param textarea
 * @param setCode
 * @param onChange
 * @param fixtureId
 * @param history
 */
export const handleTab = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    code: string,
    textarea: HTMLTextAreaElement,
    setCode: Dispatch<SetStateAction<string>>,
    onChange: (id: string, value: string) => void,
    fixtureId: string,
    history: HistoryState
) => {
    e.preventDefault()

    const { selectionStart, selectionEnd } = textarea
    const before = code.substring(0, selectionStart)
    const after = code.substring(selectionEnd)
    const tab = '\t'

    const newValue = before + tab + after

    pushHistory(history, snapshot(code, selectionStart, 'tab'))

    setCode(newValue)
    onChange(fixtureId, newValue)

    requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + tab.length
    })
}
