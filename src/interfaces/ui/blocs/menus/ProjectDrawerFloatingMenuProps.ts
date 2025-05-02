import { Dispatch, SetStateAction } from 'react'
import { FolderEntry } from '@interfaces/types/FolderEntry'

export interface ProjectDrawerFloatingMenuProps {
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
    cursorPosition: { x: number; y: number }
    activeItem: FolderEntry | null
}
