import React, { FC } from 'react'
import './editor-highlight.css'
import { EditorHighlightProps } from '@interfaces/ui/blocs/editor/EditorHighlightProps'
import { highlightCode } from '@utils/synthax/highlightCode'

const EditorHighlight: FC<EditorHighlightProps> = ({ code }) => {
    return (
        <pre
            className={'editor-highlight'}
        >
            <code
                dangerouslySetInnerHTML={{
                    __html: highlightCode(code)
                }}
            />
        </pre>
    )
}

export default EditorHighlight
