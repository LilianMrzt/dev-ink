import React, { FC } from 'react'
import './editor-file-button.css'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/ThemeContext'
import { darkenOrLightenColor } from '@utils/ColorUtils'
import { EditorFileButtonProps } from '@interfaces/ui/blocs/editor/EditorFileButtonProps'

const EditorFileButton: FC<EditorFileButtonProps> = ({
    openedFile,
    activeId,
    setActiveId
}) => {
    const { theme } = useTheme()
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
        </button>
    )
}

export default EditorFileButton
