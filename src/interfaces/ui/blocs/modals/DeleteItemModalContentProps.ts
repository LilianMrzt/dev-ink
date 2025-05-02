import { FolderEntry } from '@interfaces/types/FolderEntry'
import { Dispatch, SetStateAction } from 'react'

export interface DeleteItemModalContentProps {
    activeItem: FolderEntry
    setActiveItem: Dispatch<SetStateAction<FolderEntry | null>>
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}
