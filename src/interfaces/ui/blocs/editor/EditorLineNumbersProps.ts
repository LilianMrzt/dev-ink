import { RefObject } from 'react'
import { FixedSizeList } from 'react-window'

export interface EditorLineNumbersProps {
    code: string
    listRef: RefObject<FixedSizeList | null>
}
