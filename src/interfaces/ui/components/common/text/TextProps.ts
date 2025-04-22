import { CSSProperties, ReactNode } from 'react'

export interface TextProps {
    children: ReactNode
    fontSize?: CSSProperties['fontSize']
    color?: CSSProperties['color']
}
