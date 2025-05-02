import { Dispatch, SetStateAction } from 'react'

export interface ProjectDrawerFloatingMenuProps {
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
    cursorPosition: { x: number; y: number }
}
