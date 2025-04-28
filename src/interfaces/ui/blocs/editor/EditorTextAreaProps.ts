import { Dispatch, RefObject, SetStateAction } from 'react'

export interface EditorTextAreaProps {
    code: string
    setCode: Dispatch<SetStateAction<string>>
    linesRef: RefObject<HTMLDivElement | null>
    highlightRef: RefObject<HTMLPreElement | null>
    textareaRef: RefObject<HTMLTextAreaElement | null>
}
