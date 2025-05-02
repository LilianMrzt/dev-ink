import React, { FC, useEffect, useRef, useState } from 'react'
import './floating-menu.css'
import { FloatingMenuProps } from '@interfaces/ui/components/menu/FloatingMenuProps'

const FloatingMenu: FC<FloatingMenuProps> = ({
    isVisible,
    cursorPosition,
    onClose,
    children
}) => {
    const menuRef = useRef<HTMLDivElement | null>(null)
    const [position, setPosition] = useState(cursorPosition)

    /**
     * Calcule et ajuste la position du menu en fonction de la taille de l'écran
     */
    useEffect(() => {
        if (!isVisible) return

        requestAnimationFrame(() => {
            const menuEl = menuRef.current
            if (menuEl) {
                const { innerWidth, innerHeight } = window
                const { offsetWidth, offsetHeight } = menuEl

                let x = cursorPosition.x
                let y = cursorPosition.y

                if (x + offsetWidth > innerWidth) {
                    x = innerWidth - offsetWidth
                }

                if (y + offsetHeight > innerHeight) {
                    y = innerHeight - offsetHeight
                }

                setPosition({ x, y })
            }
        })
    }, [isVisible, cursorPosition])

    /**
     * Ferme le menu si clic à l'extérieur
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isVisible &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isVisible, onClose])

    if (!isVisible) {
        return null
    }

    return (
        <div
            ref={menuRef}
            className={'floating-menu'}
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`
            }}
        >
            {children}
        </div>
    )
}

export default FloatingMenu
