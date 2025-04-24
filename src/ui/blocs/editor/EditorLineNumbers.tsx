import React, { FC } from 'react'
import './editor-line-numbers.css'
import { EditorLineNumbersProps } from '@interfaces/ui/blocs/editor/EditorLineNumbersProps'

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
