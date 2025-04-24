import React, { FC } from 'react'
import './editor-highlight.css'
import { EditorHighlightProps } from '@interfaces/ui/blocs/editor/EditorHighlightProps'
import { highlightCode } from '@utils/synthax/highlightCode'

const EditorHighlight: FC<EditorHighlightProps> = ({
    code,
    fixture
}) => {
    return (
        <pre
            className={'editor-highlight'}
        >
            <code
                dangerouslySetInnerHTML={{
                    __html: highlightCode(code, fixture.language)
                }}
            />
        </pre>
    )
}

export default EditorHighlight
