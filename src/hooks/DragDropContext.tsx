import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface DragDropContextType {
    draggedItemPath: string | null
    setDraggedItemPath: Dispatch<SetStateAction<string | null>>
    hoveredPath: string | null
    setHoveredPath: Dispatch<SetStateAction<string | null>>
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined)

export const DragDropProvider = ({
    children
}: { children: ReactNode }) => {
    const [draggedItemPath, setDraggedItemPath] = useState<string | null>(null)
    const [hoveredPath, setHoveredPath] = useState<string | null>(null)

    return (
        <DragDropContext.Provider
            value={{
                draggedItemPath,
                setDraggedItemPath,
                hoveredPath,
                setHoveredPath
            }}
        >
            {children}
        </DragDropContext.Provider>
    )
}

export const useDragDropContext = () => {
    const context = useContext(DragDropContext)
    if (!context) throw new Error('useDragDropContext must be used within DragDropProvider')
    return context
}
