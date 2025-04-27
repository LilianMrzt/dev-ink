import React, { FC } from 'react'
import Text from '@components/text/Text'
import './project-drawer-file-item.css'
import { ProjectFolderFileItemProps } from '@interfaces/ui/blocs/drawers/project-drawer/ProjectFolderFileItemProps'
import Icon from '@components/resources/Icon'
import { FileIcon } from '@resources/Icons'
import { useTheme } from '@hooks/ThemeContext'

const ProjectFolderFileItem: FC<ProjectFolderFileItemProps> = ({
    item
}) => {
    const { theme } = useTheme()

    const iconColor = (): string => {
        const ext = item.name.split('.').pop()?.toLowerCase()

        switch (ext) {
        case 'css':
            return '#ad6c79'
        case 'ts':
        case 'tsx':
            return '#3f93b0'
        case 'js':
        case 'jsx':
            return '#FED000'
        default:
            return theme.text
        }
    }

    return (
        <div
            className={'project-drawer-file-item'}
        >
            <Icon
                color={iconColor()}
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
