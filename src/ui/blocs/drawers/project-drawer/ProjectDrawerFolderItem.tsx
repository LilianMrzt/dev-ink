import React, { FC, useState } from 'react'
import Text from '@components/text/Text'
import Icon from '@components/resources/Icon'
import { ChevronDownIcon, ChevronRightIcon, FolderIcon } from '@resources/Icons'
import { useTheme } from '@hooks/ThemeContext'
import './project-drawer-folder-item.css'
import ProjectFolderFileItem from '@ui/blocs/drawers/project-drawer/ProjectFolderFileItem'
import { ProjectDrawerFolderItemProps } from '@interfaces/ui/blocs/drawers/project-drawer/ProjectDrawerFolderItemProps'

const ProjectDrawerFolderItem: FC<ProjectDrawerFolderItemProps> = ({
    item
}) => {
    const { theme } = useTheme()

    const [showChildren, setShowChildren] = useState(false)

    return (
        <div>
            <div
                className={'project-drawer-folder-item'}
                onClick={() => {
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
                                />
                                : <ProjectFolderFileItem
                                    key={child.path}
                                    item={child}
                                />
                        )
                    })}

                </div>
            )}
        </div>
    )
}

export default ProjectDrawerFolderItem
