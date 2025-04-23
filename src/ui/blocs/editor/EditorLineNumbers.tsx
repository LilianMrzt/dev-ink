import React, { FC, RefObject } from 'react'
import './editor-line-numbers.css'

export interface EditorLineNumbersProps {
    code: string
    linesRef: RefObject<HTMLDivElement | null>
}

const EditorLineNumbers: FC<EditorLineNumbersProps> = ({
    code,
    linesRef
}) => {

    return (
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
    )
}

export default EditorLineNumbers
