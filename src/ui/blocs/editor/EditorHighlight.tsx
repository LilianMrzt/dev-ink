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
import { useEditor } from '@hooks/EditorContext'

const EditorHighlight: FC<EditorHighlightProps> = ({
    code,
    highlightRef
}) => {
    const {
        activeFile
    } = useEditor()

    /**
     * Detection du language du fichier ouvert
     * @param filename
     */
    const detectLanguage = (filename: string): string => {
        const ext = filename.split('.').pop()?.toLowerCase()
        switch (ext) {
        case 'ts': return 'typescript'
        case 'tsx': return 'tsx'
        case 'js': return 'javascript'
        case 'jsx': return 'jsx'
        case 'json': return 'json'
        case 'html': return 'markup'
        case 'css': return 'css'
        default: return 'plaintext'
        }
    }

    function highlightCode(code: string, language: string): string{
        const grammar = Prism.languages[language]
        if (!grammar) return code
        const highlighted = Prism.highlight(code, grammar, language)

        return highlighted.replace(/(\n)(?=\n*$)/, '\n&nbsp;')
    }

    const language = detectLanguage(activeFile.name)

    return (
        <pre
            ref={highlightRef}
            className={'editor-highlight'}
        >
            <code
                dangerouslySetInnerHTML={{
                    __html: highlightCode(code, language)
                }}
            />
        </pre>
    )
}

export default EditorHighlight
