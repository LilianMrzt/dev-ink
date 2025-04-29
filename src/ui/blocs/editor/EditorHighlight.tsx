import React, { CSSProperties, FC, useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import { useEditor } from '@hooks/EditorContext'
import './editor-highlight.css'
import AutoSizer from 'react-virtualized-auto-sizer'
import { EditorHighlightProps } from '@interfaces/ui/blocs/editor/EditorHighlightProps'

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

const EditorHighlight: FC<EditorHighlightProps> = ({
    code,
    highlightListRef
}) => {
    const {
        activeFile
    } = useEditor()

    const language = detectLanguage(activeFile.name)

    const lines = useMemo(() => {
        return code.split('\n')
    }, [code])
    const grammar = Prism.languages[language]

    const Row = ({ index, style }: {
        index: number
        style: CSSProperties
    }) => {
        const line = lines[index]
        const highlighted = grammar ? Prism.highlight(line, grammar, language) : line

        return (
            <div
                style={{
                    ...style
                }}
                className={'editor-row'}
            >
                <div
                    className={'editor-line-number'}
                >
                    {index + 1}
                </div>
                <div
                    className={'highlight-line'}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                />
            </div>
        )
    }

    return (
        <div
            className={'editor-highlight'}
        >
            <AutoSizer>
                {({ height, width }) => {
                    return (
                        <List
                            ref={highlightListRef}
                            height={height}
                            width={width}
                            itemSize={20}
                            itemCount={lines.length}
                            overscanCount={20}
                        >
                            {Row}
                        </List>
                    )
                }}
            </AutoSizer>
        </div>

    )
}

export default EditorHighlight
