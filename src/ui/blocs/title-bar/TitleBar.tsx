import React from 'react'
import './title-bar.css'
import Text from '@components/text/Text'
import TitleBarMenuGroup from '@ui/blocs/title-bar/TitleBarMenuGroup'
import { useTheme } from '@hooks/ThemeContext'

const TitleBar = () => {
    const { theme } = useTheme()

    return (
        <div
            className={'title-bar draggable'}
        >
            <TitleBarMenuGroup/>
            <Text
                color={theme.textSecondary}
            >
              Dev-Ink
            </Text>
            <div/>
        </div>
    )
}

export default TitleBar
