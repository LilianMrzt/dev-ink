import React, { useEffect, useRef, useState } from 'react'
import './editor-window.css'
import EditorLineNumbers from '@ui/blocs/editor/EditorLineNumbers'
import EditorTextArea from '@ui/blocs/editor/EditorTextArea'
import EditorHighlight from '@ui/blocs/editor/EditorHighlight'
import { useEditor } from '@hooks/EditorContext'

export const EditorWindow = () => {
    const [code, setCode] = useState('')
    const linesRef = useRef<HTMLDivElement | null>(null)

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
            <EditorLineNumbers
                linesRef={linesRef}
                code={code}
            />
            <div
                className={'editor-layer'}
            >
                <EditorHighlight
                    code={code}
                />
                <EditorTextArea
                    code={code}
                    setCode={setCode}
                    linesRef={linesRef}
                />
            </div>
        </div>
    )
}
