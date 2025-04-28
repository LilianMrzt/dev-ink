import { RefObject } from 'react'

export interface EditorHighlightProps {
    code: string
    highlightRef: RefObject<HTMLPreElement | null>
}
