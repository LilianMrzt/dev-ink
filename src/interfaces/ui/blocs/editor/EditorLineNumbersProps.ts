import { RefObject } from 'react'

export interface EditorLineNumbersProps {
    code: string
    linesRef: RefObject<HTMLDivElement | null>
}
