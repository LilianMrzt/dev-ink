import { RefObject } from 'react'
import { FixedSizeList } from 'react-window'

export interface EditorHighlightProps {
    code: string;
    highlightListRef: RefObject<FixedSizeList | null>
    outerHighlightRef: RefObject<HTMLDivElement | null>
    activeLineIndex: number
}
