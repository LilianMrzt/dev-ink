import React, { FC } from 'react'
import { TextProps } from '@interfaces/ui/components/text/TextProps'
import './text.css'
import { useTheme } from '@hooks/ThemeContext'

const Text: FC<TextProps> = ({
    children,
    fontSize,
    color,
    wrap,
    textAlign,
    width
}) => {
    const { theme } = useTheme()

    return (
        <p
            className={`text ${wrap ? 'wrap' : ''}`}
            style={{
                fontSize: fontSize ?? 13,
                color: color ?? theme.text,
                textAlign: textAlign ?? 'center',
                width: width ?? 'fit-content'
            }}
        >
            {children}
        </p>
    )
}

export default Text
