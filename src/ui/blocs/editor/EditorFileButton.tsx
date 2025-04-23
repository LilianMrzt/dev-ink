import React, { FC } from 'react'
import './editor-file-button.css'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/ThemeContext'
import { darkenOrLightenColor } from '@utils/ColorUtils'
import { EditorFileButtonProps } from '@interfaces/ui/blocs/editor/EditorFileButtonProps'

const EditorFileButton: FC<EditorFileButtonProps> = ({
    fix,
    activeId,
    setActiveId
}) => {

    const { theme } = useTheme()
    const isSelected = fix.id === activeId

    return (
        <button
            className={'editor-file-button'}
            onClick={() => {
                return setActiveId(fix.id)
            }}
            style={{
                backgroundColor: isSelected ? darkenOrLightenColor(theme.primary, 'lighten') : theme.primary
            }}
        >
            <Text
                fontSize={12}
            >
                {fix.name}
            </Text>
        </button>
    )
}

export default EditorFileButton
