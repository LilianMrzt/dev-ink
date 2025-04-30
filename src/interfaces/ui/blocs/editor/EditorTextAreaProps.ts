import { Dispatch, RefObject, SetStateAction } from 'react'
import { FixedSizeList } from 'react-window'

export interface EditorTextAreaProps {
    code: string
    setCode: Dispatch<SetStateAction<string>>
    textareaRef: RefObject<HTMLTextAreaElement | null>
    highlightListRef: RefObject<FixedSizeList | null>
    outerHighlightRef: RefObject<HTMLDivElement | null>
    lineNumberListRef: RefObject<FixedSizeList | null>
    setActiveLineIndex: Dispatch<SetStateAction<number>>
}
