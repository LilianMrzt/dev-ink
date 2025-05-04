import React, { FC, useState, MouseEvent } from 'react'
import Text from '@components/text/Text'
import Icon from '@components/resources/Icon'
import { ChevronDownIcon, ChevronRightIcon, FolderIcon } from '@resources/Icons'
import { useTheme } from '@hooks/ThemeContext'
import './project-drawer-folder-item.css'
import ProjectFolderFileItem from '@ui/blocs/drawers/project-drawer/ProjectFolderFileItem'
import { ProjectDrawerFolderItemProps } from '@interfaces/ui/blocs/drawers/project-drawer/ProjectDrawerFolderItemProps'
import ProjectDrawerFloatingMenu from '@ui/blocs/menus/ProjectDrawerFloatingMenu'
import { useDragDropContext } from '@hooks/DragDropContext'
import { useFolder } from '@hooks/FolderContext'

const ProjectDrawerFolderItem: FC<ProjectDrawerFolderItemProps> = ({
    item,
    activeItem,
    setActiveItem,
    depth = 0
}) => {
    const {
        theme
    } = useTheme()

    const {
        setOpenFolder
    } = useFolder()

    const {
        draggedItemPath,
        setDraggedItemPath,
        hoveredPath,
        setHoveredPath
    } = useDragDropContext()

    const isActive = activeItem?.path === item.path

    const [showChildren, setShowChildren] = useState(false)
    const [isFloatingMenuVisible, setIsFloatingMenuVisible] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

    const isHovered = hoveredPath === item.path
    const canDropItem = draggedItemPath !== item.path &&
        !draggedItemPath?.startsWith(item.path + '/') &&
        item.isDirectory

    /**
     * Gestion du drop d'un element sur un dossier
     */
    const handleDrop = async () => {

        if (!draggedItemPath || !canDropItem) {
            return
        }

        const response = await window.electronAPI?.movePath(draggedItemPath, item.path)

        if (response?.newPath) {
            const refreshed = await window.electronAPI?.getLastOpenedFolder()
            if (refreshed) {
                setOpenFolder(refreshed)
            }
        }

        setHoveredPath(null)
        setDraggedItemPath(null)
    }

    /**
     * Gestion du click droit sur l'élément
     * @param e
     */
    const handleRightClick = (e: MouseEvent) => {
        e.preventDefault()
        setCursorPosition({ x: e.clientX, y: e.clientY })
        setIsFloatingMenuVisible(true)
    }

    return (
        <div>
            <div
                className={`project-drawer-folder-item ${isActive ? 'active' : ''}`}
                style={{
                    paddingLeft: depth * 20,
                    backgroundColor: isHovered ? theme.tertiary : undefined
                }}
                onMouseDown={() => {
                    setActiveItem(item)
                }}
                onDoubleClick={() => {
                    setShowChildren(!showChildren)
                }}
                onContextMenu={(event) => {
                    setActiveItem(item)
                    handleRightClick(event)
                }}
                onDragStart={() => {
                    setDraggedItemPath(item.path)
                }}
                onDragOver={(e) => {
                    e.preventDefault()
                    if (draggedItemPath && canDropItem) {
                        setHoveredPath(item.path)
                    }
                }}
                onDragLeave={() => {
                    setHoveredPath(null)
                }}
                onDrop={handleDrop}
                draggable
            >
                <button
                    className={'project-drawer-folder-item-icon-button'}
                    onClick={(event) => {
                        event.stopPropagation()
                        setShowChildren(!showChildren)
                    }}
                >
                    <Icon
                        color={theme.text}
                    >
                        {showChildren ? (
                            <ChevronDownIcon/>
                        ) : (
                            <ChevronRightIcon/>
                        )}
                    </Icon>
                </button>
                <Icon
                    color={theme.text}
                >
                    <FolderIcon/>
                </Icon>
                <Text>
                    {item.name}
                </Text>
            </div>
            {showChildren && item.children && item.children?.length > 0 && (
                <div
                    className={'project-drawer-folder-item-children'}
                >
                    {item.children.map((child) => {
                        return (
                            child.isDirectory
                                ? <ProjectDrawerFolderItem
                                    key={child.path}
                                    item={child}
                                    activeItem={activeItem}
                                    setActiveItem={setActiveItem}
                                    depth={depth + 1}
                                />
                                : <ProjectFolderFileItem
                                    key={child.path}
                                    item={child}
                                    activeItem={activeItem}
                                    setActiveItem={setActiveItem}
                                    depth={depth + 1}
                                />
                        )
                    })}
                </div>
            )}
            <ProjectDrawerFloatingMenu
                cursorPosition={cursorPosition}
                setIsVisible={setIsFloatingMenuVisible}
                isVisible={isFloatingMenuVisible}
                activeItem={activeItem}
            />
        </div>
    )
}

export default ProjectDrawerFolderItem
