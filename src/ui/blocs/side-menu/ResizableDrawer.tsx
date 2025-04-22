import React, { FC, useEffect, useRef, useState } from 'react'
import './resizable-drawer.css'
import { ResizableDrawerProps } from '@interfaces/ui/blocs/side-menu/ResizableDrawerProps'

const MIN_WIDTH = 200
const MAX_WIDTH = 600

const ResizableDrawer: FC<ResizableDrawerProps> = ({
    children,
    storageKey
}) => {
    const [width, setWidth] = useState<number>(() => {
        const stored = localStorage.getItem(storageKey)
        return stored ? Math.min(Math.max(Number(stored), MIN_WIDTH), MAX_WIDTH) : MIN_WIDTH
    })

    const isDragging = useRef(false)

    /**
     * Déclenché lors du clic sur la poignée de redimensionnement.
     * Active le mode redimensionnement et ajoute les listeners nécessaires.
     */
    const handleMouseDown = () => {
        isDragging.current = true
        document.body.style.cursor = 'ew-resize'
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    /**
     * Événement de mouvement de la souris pendant le redimensionnement.
     * Met à jour dynamiquement la largeur du tiroir et la sauvegarde.
     * @param e
     */
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return

        const newWidth = Math.min(Math.max(e.clientX - 50, MIN_WIDTH), MAX_WIDTH)
        setWidth(newWidth)
        localStorage.setItem(storageKey, newWidth.toString())
    }

    /**
     * Déclenché lors du relâchement de la souris.
     * Met fin au redimensionnement et nettoie les listeners.
     */
    const handleMouseUp = () => {
        isDragging.current = false
        document.body.style.cursor = 'default'
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    /**
     * Nettoyage automatique des listeners au démontage du composant.
     */
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = 'default'
        }
    }, [])

    return (
        <div
            className={'resizable-drawer'}
            style={{
                width
            }}
        >
            {children}
            <div
                className={'resizable-drawer-handle'}
                onMouseDown={handleMouseDown}
            />
        </div>
    )
}

export default ResizableDrawer
