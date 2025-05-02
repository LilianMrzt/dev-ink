import React, { FC } from 'react'
import Text from '@components/text/Text'
import { ButtonProps } from '@interfaces/ui/components/buttons/ButtonProps'
import './button.css'
import { useTheme } from '@hooks/ThemeContext'

const Button: FC<ButtonProps> = ({
    onClick,
    label,
    borderColor,
    backgroundColor
}) => {
    const { theme } = useTheme()

    return (
        <button
            onClick={onClick}
            className={'button'}
            style={{
                backgroundColor: backgroundColor ?? theme.tertiary,
                borderColor: borderColor ?? theme.tertiary
            }}
        >
            <Text>
                {label}
            </Text>
        </button>
    )
}

export default Button
