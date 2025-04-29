import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import './editor-text-area.css'
import { EditorTextAreaProps } from '@interfaces/ui/blocs/editor/EditorTextAreaProps'
import { handleEditorKeyDown } from '@utils/keys-press/handleEditorKeyDown'
import { createHistory, pushHistory, snapshot } from '@utils/editorHistory'
import { HistoryState } from '@interfaces/types/History'
import { useEditor } from '@hooks/EditorContext'

const EditorTextArea: FC<EditorTextAreaProps> = ({
    setCode,
    code,
    textareaRef,
    highlightListRef,
    outerHighlightRef
}) => {
    const {
        activeFile,
        handleActiveFileChange
    } = useEditor()

    const historyRef = useRef<HistoryState>(createHistory())
    const debounceTimeout = useRef<number | null>(null)

    useEffect(() => {
        setCode(activeFile.content)
    }, [activeFile.id, activeFile.content])

    /**
     * Gère la modification du contenu du textarea.
     * Met à jour l'état local et remonte les changements au parent.
     */
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value

        if (textareaRef.current) {
            if ('selectionStart' in textareaRef.current) {
                const cursor = textareaRef.current.selectionStart
                pushHistory(
                    historyRef.current,
                    snapshot(code, cursor, 'insert')
                )
            }
        }

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current as number)
        }

        setCode(newValue)
        handleActiveFileChange(activeFile.id, newValue)
    }

    /**
     * Synchronise le scroll du textarea avec la colonne des numéros de ligne et le highlight.
     */
    const handleScroll = () => {
        if (textareaRef.current && outerHighlightRef.current) {
            if ('scrollTop' in textareaRef.current && 'scrollLeft' in textareaRef.current) {
                const scrollTop = textareaRef.current.scrollTop
                const scrollLeft = textareaRef.current.scrollLeft

                highlightListRef.current?.scrollTo(scrollTop)
                if ('scrollLeft' in outerHighlightRef.current) {
                    outerHighlightRef.current.scrollLeft = scrollLeft
                }
            }
        }
    }

    /**
     * Gestion de la pression des touches du clavier
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        handleEditorKeyDown(e, code, textareaRef.current, setCode, handleActiveFileChange, activeFile.id, historyRef.current)
    }

    return (
        <div
            className={'editor-textarea-wrapper'}
        >
            <textarea
                ref={textareaRef}
                className={'editor-text-area'}
                value={code}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onScroll={handleScroll}
                spellCheck={false}
            />
        </div>
    )
}

export default EditorTextArea
