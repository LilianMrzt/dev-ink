import React, { useEffect, useRef, useState } from 'react'
import './editor-window.css'
import EditorLineNumbers from '@ui/blocs/editor/EditorLineNumbers'
import EditorTextArea from '@ui/blocs/editor/EditorTextArea'
import { useEditor } from '@hooks/EditorContext'
import EditorHighlight from '@ui/blocs/editor/EditorHighlight'

const LINE_HEIGHT = 20

export const EditorWindow = () => {
    const [code, setCode] = useState('')
    const containerRef = useRef<HTMLDivElement | null>(null)
    const linesRef = useRef<HTMLDivElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const highlightRef = useRef<HTMLDivElement | null>(null)

    const {
        activeFile,
        openedFiles
    } = useEditor()

    useEffect(() => {
        if (activeFile) {
            setCode(activeFile.content)
        }
    }, [activeFile])

    if (openedFiles.length === 0 || !activeFile) {
        return (
            <div className="editor-window empty">
                No file opened.
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className={'editor-window'}
        >
            <EditorLineNumbers
                linesRef={linesRef}
                code={code}
            />
            <div
                className={'editor-layer'}
            >
                <EditorHighlight
                    code={code}
                    lineHeight={LINE_HEIGHT}
                    highlightRef={highlightRef}
                />
                <EditorTextArea
                    code={code}
                    setCode={setCode}
                    linesRef={linesRef}
                    textareaRef={textareaRef}
                    highlightRef={highlightRef}
                />
            </div>
        </div>
    )
}
