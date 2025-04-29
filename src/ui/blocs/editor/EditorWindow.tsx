import React from 'react'
import EditorHighlight from '@ui/blocs/editor/EditorHighlight'
import EditorTextArea from '@ui/blocs/editor/EditorTextArea'
import { useEffect, useRef, useState } from 'react'
import { useEditor } from '@hooks/EditorContext'
import './editor-window.css'
import { FixedSizeList } from 'react-window'

export const EditorWindow = () => {
    const [code, setCode] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const highlightListRef = useRef<FixedSizeList | null>(null)

    const {
        activeFile,
        openedFiles
    } = useEditor()

    useEffect(() => {
        if (activeFile) {
            setCode(activeFile.content)
        }
    }, [activeFile])

    if (openedFiles.length === 0) {
        return (
            <div className="editor-window empty">
                No file opened.
            </div>
        )
    }

    return (
        <div
            className={'editor-window'}
        >
            <div
                className={'editor-layer'}
            >
                <EditorHighlight
                    code={code}
                    highlightListRef={highlightListRef}
                />
                <EditorTextArea
                    code={code}
                    setCode={setCode}
                    textareaRef={textareaRef}
                    highlightListRef={highlightListRef}
                />
            </div>
        </div>
    )
}
