import { RefObject } from 'react'

export interface EditorHighlightProps {
    code: string;
    lineHeight: number;
    highlightRef: RefObject<HTMLDivElement | null>
}
