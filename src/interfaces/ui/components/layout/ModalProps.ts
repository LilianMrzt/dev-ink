import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface ModalProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    children: ReactNode
}
