import React, { ChangeEvent, FC, RefObject, useEffect, useRef } from 'react'
import { Fixture } from '@src/fixtures'
import './editor-text-area.css'

export interface EditorTextAreaProps {
    code: string
    fixture: Fixture
    setCode: (code: string) => void
    linesRef: RefObject<HTMLDivElement | null>
    onChange: (id: string, value: string) => void;
}

const EditorTextArea: FC<EditorTextAreaProps> = ({
    setCode,
    code,
    linesRef,
    fixture,
    onChange
}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        setCode(fixture.content)
    }, [fixture.id, fixture.content])

    /**
     * Gère la modification du contenu du textarea.
     * Met à jour l'état local et remonte les changements au parent.
     */
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
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
     * Intercepte la touche `Tab` pour insérer une tabulation personnalisée
     * au lieu de changer le focus par défaut.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault()
            const el = textareaRef.current
            if (!el) return

            const { selectionStart, selectionEnd } = el
            const before = code.substring(0, selectionStart)
            const after = code.substring(selectionEnd)
            const tab = '\t'

            const newValue = before + tab + after
            setCode(newValue)
            onChange(fixture.id, newValue)

            requestAnimationFrame(() => {
                el.selectionStart = el.selectionEnd = selectionStart + tab.length
            })
        }
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
