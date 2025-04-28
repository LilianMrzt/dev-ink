import { Dispatch, SetStateAction } from 'react'
import { File } from '@interfaces/types/File'

export interface EditorFileButtonProps {
    openedFile: File
    activeId: string | null
    setActiveId: Dispatch<SetStateAction<string | null>>
}
