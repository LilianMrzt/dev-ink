import React, { CSSProperties, FC, useMemo } from 'react'
import { FixedSizeList } from 'react-window'
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
    highlightListRef,
    outerHighlightRef,
    activeLineIndex
}) => {
    const {
        activeFile
    } = useEditor()

    const language = detectLanguage(activeFile.name)

    const lines = useMemo(() => {
        return code.split('\n')
    }, [code])
    const grammar = Prism.languages[language]

    const maxLineLength = useMemo(() => {
        return Math.max(...lines.map((line) => {
            return line.length
        }))
    }, [lines])

    const estimatedCharWidth = 8.4
    const highlightContentWidth = maxLineLength * estimatedCharWidth

    const Row = ({ index, style }: {
        index: number
        style: CSSProperties
    }) => {
        if (index === lines.length) {
            return (
                <div
                    style={{
                        ...style,
                        height: 200
                    }}
                />
            )
        }

        const line = lines[index]
        const highlighted = grammar ? Prism.highlight(line, grammar, language) : line

        const isActive = index === activeLineIndex

        return (
            <div
                className={`highlight-line ${isActive ? 'active' : ''}`}
                style={{
                    ...style,
                    minWidth: highlightContentWidth
                }}
                dangerouslySetInnerHTML={{ __html: highlighted }}
            />
        )
    }

    return (
        <div
            className={'editor-highlight'}
        >
            <AutoSizer>
                {({ height, width }) => {
                    return (
                        <FixedSizeList
                            ref={highlightListRef}
                            height={height}
                            width={width}
                            itemSize={20}
                            itemCount={lines.length + 1}
                            outerRef={outerHighlightRef}
                            className={'highlight-fixed-list'}
                        >
                            {Row}
                        </FixedSizeList>
                    )
                }}
            </AutoSizer>
        </div>

    )
}

export default EditorHighlight
