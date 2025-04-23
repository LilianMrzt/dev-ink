import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import './editor-window.css'
import { EditorWindowProps } from '@interfaces/ui/blocs/editor/EditorWindowProps'

export const EditorWindow: FC<EditorWindowProps> = ({
    fixture,
    onChange
}) => {
    const [code, setCode] = useState(fixture.content)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        setCode(fixture.content)
    }, [fixture.id, fixture.content])

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        setCode(newValue)
        onChange(fixture.id, newValue)
    }

    return (
        <div
            className={'editor-window'}
        >
            <textarea
                ref={textareaRef}
                className={'editor-window-textarea'}
                value={code}
                onChange={handleChange}
                spellCheck={false}
            />
        </div>
    )
}
