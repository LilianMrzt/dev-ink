import React, { FC, useState } from 'react'
import './editor-file-button.css'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/ThemeContext'
import { EditorFileButtonProps } from '@interfaces/ui/blocs/editor/EditorFileButtonProps'
import Icon from '@components/resources/Icon'
import { CloseIcon, FileIcon } from '@resources/Icons'
import { useEditor } from '@hooks/EditorContext'
import { filesIconColor } from '@constants/filesIcons'
import IconButton from '@components/buttons/IconButton'

const EditorFileButton: FC<EditorFileButtonProps> = ({
    openedFile,
    activeId,
    setActiveId
}) => {
    const { theme } = useTheme()
    const { closeFile } = useEditor()
    const isSelected = openedFile.id === activeId
    const [isHovered, setIsHovered] = useState(false)

    const backgroundColor = isSelected
        ? theme.primaryHover
        : isHovered ? theme.background : theme.primary

    return (
        <div
            className={'editor-file-button'}
            role={'button'}
            onClick={() => {
                return setActiveId(openedFile.id)
            }}
            style={{
                backgroundColor:backgroundColor,
                borderColor: backgroundColor
            }}
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
        >
            <Icon
                color={filesIconColor(openedFile.name, theme)}
            >
                <FileIcon/>
            </Icon>
            <Text
                fontSize={13}
            >
                {openedFile.name}
            </Text>
            {openedFile.isModified && (
                <div
                    className={'editor-file-button-modified-indicator'}
                />
            )}
            <IconButton
                className={'editor-file-button-close'}
                onClick={() => {
                    closeFile(openedFile.id)
                }}
            >
                <CloseIcon/>
            </IconButton>
        </div>
    )
}

export default EditorFileButton
