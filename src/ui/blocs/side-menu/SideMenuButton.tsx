import React, { FC, useState } from 'react'
import Icon from '@components/common/resources/Icon'
import './side-menu-button.css'
import { useTheme } from '@hooks/ThemeContext'
import { SideMenuButtonProps } from '@interfaces/ui/components/blocs/side-menu/SideMenuButtonProps'
import { darkenOrLightenColor } from '@utils/ColorUtils'

const SideMenuButton: FC<SideMenuButtonProps> = ({
    children,
    onClick
}) => {
    const  { theme } = useTheme()
    const [isHovered, setIsHovered] = useState(false)

    return (
        <button
            className={'side-menu-button'}
            onClick={onClick}
            onMouseEnter={() => { setIsHovered(true)}}
            onMouseLeave={() => { setIsHovered(false)}}
            style={{
                backgroundColor: isHovered ? darkenOrLightenColor(theme.background, 'lighten') : theme.background
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
