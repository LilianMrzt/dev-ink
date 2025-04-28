import { FolderEntry } from '@interfaces/types/FolderEntry'
import { Dispatch, SetStateAction } from 'react'

export interface ProjectFolderFileItemProps {
    item: FolderEntry
    activeItem: string | null
    setActiveItem: Dispatch<SetStateAction<string | null>>
    depth?: number;
}
