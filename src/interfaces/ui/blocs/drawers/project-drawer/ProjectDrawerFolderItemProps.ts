import { FolderEntry } from '@interfaces/types/FolderEntry'
import { Dispatch, SetStateAction } from 'react'

export interface ProjectDrawerFolderItemProps {
    item: FolderEntry
    activeItem: FolderEntry | null
    setActiveItem: Dispatch<SetStateAction<FolderEntry | null>>
    depth?: number;
}
