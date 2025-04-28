import React, { FC, useState } from 'react'
import './editor-file-button.css'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/ThemeContext'
import { EditorFileButtonProps } from '@interfaces/ui/blocs/editor/EditorFileButtonProps'
import Icon from '@components/resources/Icon'
import { CloseIcon, FileIcon } from '@resources/Icons'
import { useEditor } from '@hooks/EditorContext'
import { filesIconColor } from '@constants/filesIcons'

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
        <button
            className={'editor-file-button'}
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
            {/** TODO: Creer composant réutilisable **/}
            <button
                className={'editor-file-button-close'}
                onClick={(event) => {
                    event.stopPropagation()
                    closeFile(openedFile.id)
                }}
            >
                <Icon
                    color={theme.text}
                >
                    <CloseIcon/>
                </Icon>
            </button>
        </button>
    )
}

export default EditorFileButton
