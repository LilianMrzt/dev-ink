import React, { FC } from 'react'
import './editor-highlight.css'
import { EditorHighlightProps } from '@interfaces/ui/blocs/editor/EditorHighlightProps'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'

const EditorHighlight: FC<EditorHighlightProps> = ({
    code,
    fixture
}) => {
    function highlightCode(code: string, language: string): string{
        const grammar = Prism.languages[language]
        if (!grammar) return code
        return Prism.highlight(code, grammar, language)
    }

    console.log('test')

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
