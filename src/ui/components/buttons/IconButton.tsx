import React, { FC } from 'react'
import Icon from '@components/resources/Icon'
import { useTheme } from '@hooks/ThemeContext'
import './icon-button.css'
import { IconButtonProps } from '@interfaces/ui/components/buttons/IconButtonProps'

const IconButton: FC<IconButtonProps> = ({
    onClick,
    children,
    className,
    iconSize
}) => {
    const { theme } = useTheme()

    return (
        <button
            className={`icon-button ${className}`}
            onClick={(event) => {
                event.stopPropagation()
                onClick()
            }}
        >
            <Icon
                color={theme.text}
                size={iconSize ?? 12}
            >
                {children}
            </Icon>
        </button>
    )
}

export default IconButton
