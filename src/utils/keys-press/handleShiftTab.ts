import { KeyboardEvent } from 'react'
import { pushHistory, snapshot } from '@utils/editorHistory'
import { HistoryState } from '@interfaces/types/History'

/**
 * Gestion du shift + tabulation
 * @param e
 * @param code
 * @param textarea
 * @param setCode
 * @param onChange
 * @param fixtureId
 * @param history
 */
export const handleShiftTab = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    code: string,
    textarea: HTMLTextAreaElement,
    setCode: (code: string) => void,
    onChange: (id: string, value: string) => void,
    fixtureId: string,
    history: HistoryState
) => {
    const { selectionStart, selectionEnd } = textarea
    const lineStart = code.lastIndexOf('\n', selectionStart - 1) + 1
    let lineEnd = code.indexOf('\n', selectionEnd)
    if (lineEnd === -1) lineEnd = code.length

    const affected = code.slice(lineStart, lineEnd)
    const replaced = affected.replace(/^\t/, '')
    const newCode = code.slice(0, lineStart) + replaced + code.slice(lineEnd)

    pushHistory(history, snapshot(code, selectionStart, 'tab'))

    setCode(newCode)
    onChange(fixtureId, newCode)

    requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart - 1
    })
}
