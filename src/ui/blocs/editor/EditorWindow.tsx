import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import './editor-window.css'
import { EditorWindowProps } from '@interfaces/ui/blocs/editor/EditorWindowProps'

export const EditorWindow: FC<EditorWindowProps> = ({
    fixture,
    onChange
}) => {
    const [code, setCode] = useState(fixture.content)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const linesRef = useRef<HTMLDivElement | null>(null)

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
        <div
            className={'editor-window'}
        >
            <div
                ref={linesRef}
                className={'editor-lines'}
            >
                {code.split('\n').map((_, i) => {
                    return (
                        <div
                            key={i}
                            className={'editor-line-number'}
                        >
                            {i + 1}
                        </div>
                    )
                })}
            </div>
            <textarea
                ref={textareaRef}
                className={'editor-window-textarea'}
                value={code}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onScroll={handleScroll}
                spellCheck={false}
            />
        </div>
    )
}
