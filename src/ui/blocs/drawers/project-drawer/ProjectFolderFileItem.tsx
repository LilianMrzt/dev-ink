import React, { FC } from 'react'
import Text from '@components/text/Text'
import './project-drawer-file-item.css'
import { ProjectFolderFileItemProps } from '@interfaces/ui/blocs/drawers/project-drawer/ProjectFolderFileItemProps'
import Icon from '@components/resources/Icon'
import { FileIcon } from '@resources/Icons'
import { useTheme } from '@hooks/ThemeContext'
import { useEditor } from '@hooks/EditorContext'
import { filesIconColor } from '@constants/filesIcons'

const ProjectFolderFileItem: FC<ProjectFolderFileItemProps> = ({
    item,
    activeItem,
    setActiveItem,
    depth = 0
}) => {
    const { theme } = useTheme()
    const {
        openFile
    } = useEditor()

    const isActive = activeItem?.path === item.path

    return (
        <div
            className={`project-drawer-file-item ${isActive ? 'active' : ''}`}
            style={{
                paddingLeft: (depth + 1) * 20
            }}
            onClick={() => {
                setActiveItem(item)
            }}
            onDoubleClick={async () => {
                setActiveItem(item)

                if (!item.isDirectory) {
                    const content = await window.electronAPI?.readFile(item.path) || ''

                    openFile({
                        id: item.path,
                        path: item.path,
                        name: item.name,
                        content
                    })
                }
            }}

        >
            <Icon
                color={filesIconColor(item.name, theme)}
            >
                <FileIcon/>
            </Icon>
            <Text>
                {item.name}
            </Text>
        </div>
    )
}

export default ProjectFolderFileItem
