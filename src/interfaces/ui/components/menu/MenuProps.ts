import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface MenuProps {
    children: ReactNode
    label: string
    openedMenu: string | null
    setOpenedMenu: Dispatch<SetStateAction<string | null>>
}
