import React, { FC } from 'react'
import './editor-file-button.css'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/ThemeContext'
import { darkenOrLightenColor } from '@utils/ColorUtils'
import { EditorFileButtonProps } from '@interfaces/ui/blocs/editor/EditorFileButtonProps'
import Icon from '@components/resources/Icon'
import { CloseIcon } from '@resources/Icons'
import { useEditor } from '@hooks/EditorContext'

const EditorFileButton: FC<EditorFileButtonProps> = ({
    openedFile,
    activeId,
    setActiveId
}) => {
    const { theme } = useTheme()
    const { closeFile } = useEditor()
    const isSelected = openedFile.id === activeId

    return (
        <button
            className={`editor-file-button ${isSelected ? 'active' : ''}`}
            onClick={() => {
                return setActiveId(openedFile.id)
            }}
            style={{
                backgroundColor: isSelected ? darkenOrLightenColor(theme.primary, 'lighten') : theme.primary
            }}
        >
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
