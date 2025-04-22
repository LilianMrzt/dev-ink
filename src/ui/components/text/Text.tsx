import React, { FC } from 'react'
import { TextProps } from '@interfaces/ui/components/text/TextProps'
import './text.css'
import { useTheme } from '@hooks/ThemeContext'

const Text: FC<TextProps> = ({
    children,
    fontSize,
    color
}) => {
    const { theme } = useTheme()

    return (
        <p
            className={'text'}
            style={{
                fontSize: fontSize ?? 13,
                color: color ?? theme.text
            }}
        >
            {children}
        </p>
    )
}

export default Text
