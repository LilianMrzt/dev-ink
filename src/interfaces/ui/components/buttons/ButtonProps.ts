import { CSSProperties } from 'react'

export interface ButtonProps {
    onClick: () => void
    label: string
    backgroundColor?: CSSProperties['backgroundColor']
    borderColor?: CSSProperties['borderColor']
}
