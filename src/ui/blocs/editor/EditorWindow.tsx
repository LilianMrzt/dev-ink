import React, { FC, useRef, useState } from 'react'
import './editor-window.css'
import { EditorWindowProps } from '@interfaces/ui/blocs/editor/EditorWindowProps'
import EditorLineNumbers from '@ui/blocs/editor/EditorLineNumbers'
import EditorTextArea from '@ui/blocs/editor/EditorTextArea'
import EditorHighlight from '@ui/blocs/editor/EditorHighlight'

export const EditorWindow: FC<EditorWindowProps> = ({
    fixture,
    onChange
}) => {
    const [code, setCode] = useState(fixture.content)
    const linesRef = useRef<HTMLDivElement | null>(null)

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
                    fixture={fixture}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}
