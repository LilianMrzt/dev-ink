import React, { FC, useState } from 'react'
import Text from '@components/text/Text'
import Icon from '@components/resources/Icon'
import { ChevronDownIcon, ChevronRightIcon, FolderIcon } from '@resources/Icons'
import { useTheme } from '@hooks/ThemeContext'
import './project-drawer-folder-item.css'
import ProjectFolderFileItem from '@ui/blocs/drawers/project-drawer/ProjectFolderFileItem'
import { ProjectDrawerFolderItemProps } from '@interfaces/ui/blocs/drawers/project-drawer/ProjectDrawerFolderItemProps'

const ProjectDrawerFolderItem: FC<ProjectDrawerFolderItemProps> = ({
    item,
    activeItem,
    setActiveItem,
    depth = 0
}) => {
    const { theme } = useTheme()

    const isActive = activeItem === item.path

    const [showChildren, setShowChildren] = useState(false)

    return (
        <div>
            <div
                className={`project-drawer-folder-item ${isActive ? 'active' : ''}`}
                style={{
                    paddingLeft: depth * 20
                }}
                onClick={() => {
                    setShowChildren(!showChildren)
                    setActiveItem(item.path)
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
        </div>
    )
}

export default ProjectDrawerFolderItem
