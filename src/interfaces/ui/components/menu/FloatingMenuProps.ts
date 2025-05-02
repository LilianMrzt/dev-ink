import React from 'react'

export interface FloatingMenuProps {
    isVisible: boolean
    cursorPosition: { x: number; y: number }
    onClose: () => void
    children: React.ReactNode
}
