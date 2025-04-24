import React, { FC } from 'react'
import './editor-highlight.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/themes/prism-tomorrow.css'
import { EditorHighlightProps } from '@interfaces/ui/blocs/editor/EditorHighlightProps'

const EditorHighlight: FC<EditorHighlightProps> = ({ code }) => {
    // TODO: Verifier si possible sans librairie
    const highlighted = Prism.highlight(code, Prism.languages.typescript, 'typescript')

    return (
        <pre
            className={'editor-highlight'}
        >
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
    )
}

export default EditorHighlight
