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

    return (
        <div
            className={'project-drawer-file-item'}
        >
            <Icon
                color={theme.text}
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
