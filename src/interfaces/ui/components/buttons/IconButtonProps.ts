import { ReactElement } from 'react'

export interface IconButtonProps {
    onClick: () => void
    children: ReactElement
    className?: string
    iconSize?: number
}
