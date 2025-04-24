import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import './editor-text-area.css'
import { EditorTextAreaProps } from '@interfaces/ui/blocs/editor/EditorTextAreaProps'
import { handleEditorKeyDown } from '@utils/keys-press/handleEditorKeyDown'
import { createHistory, pushHistory } from '@utils/editorHistory'
import { HistoryState } from '@interfaces/types/History'

const EditorTextArea: FC<EditorTextAreaProps> = ({
    setCode,
    code,
    linesRef,
    fixture,
    onChange
}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const historyRef = useRef<HistoryState>(createHistory())
    const debounceTimeout = useRef<number | null>(null)

    useEffect(() => {
        setCode(fixture.content)
    }, [fixture.id, fixture.content])

    /**
     * Gère la modification du contenu du textarea.
     * Met à jour l'état local et remonte les changements au parent.
     */
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value

        if (textareaRef.current) {
            if ('selectionStart' in textareaRef.current) {
                pushHistory(historyRef.current, {
                    code,
                    cursor: textareaRef.current.selectionStart
                })
            }
        }

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current as number)
        }

        setCode(newValue)
        onChange(fixture.id, newValue)
    }

    /**
     * Synchronise le scroll vertical du textarea avec la colonne des numéros de ligne.
     */
    const handleScroll = () => {
        if (textareaRef.current && linesRef.current) {
            if ('scrollTop' in linesRef.current && 'scrollTop' in textareaRef.current) {
                linesRef.current.scrollTop = textareaRef.current.scrollTop
            }
        }
    }

    /**
     * Gestion de la pression des touches du clavier
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        handleEditorKeyDown(e, code, textareaRef.current, setCode, onChange, fixture.id, historyRef.current)
    }

    return (
        <textarea
            ref={textareaRef}
            className={'editor-text-area'}
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            spellCheck={false}
        />
    )
}

export default EditorTextArea
