import React, { FC, useState } from 'react'
import Icon from '@components/resources/Icon'
import './side-menu-button.css'
import { useTheme } from '@hooks/ThemeContext'
import { SideMenuButtonProps } from '@interfaces/ui/blocs/side-menu/SideMenuButtonProps'
import { darkenOrLightenColor } from '@utils/ColorUtils'

const SideMenuButton: FC<SideMenuButtonProps> = ({
    children,
    onClick,
    isSelected
}) => {
    const  { theme } = useTheme()
    const [isHovered, setIsHovered] = useState(false)

    const backgroundColor = isSelected
        ? isHovered ? darkenOrLightenColor(theme.background, 'lighten') :  darkenOrLightenColor(theme.background, 'lighten', 5)
        : isHovered ? darkenOrLightenColor(theme.background, 'lighten') : theme.background

    return (
        <button
            className={'side-menu-button'}
            onClick={onClick}
            onMouseEnter={() => { setIsHovered(true)}}
            onMouseLeave={() => { setIsHovered(false)}}
            style={{
                backgroundColor: backgroundColor
            }}
        >
            <Icon
                color={theme.tertiary}
            >
                {children}
            </Icon>
        </button>
    )
}

export default SideMenuButton
