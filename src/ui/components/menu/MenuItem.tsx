import React, { FC } from 'react'
import './menu-item.css'
import Text from '@components/text/Text'
import { MenuItemProps } from '@interfaces/ui/components/menu/MenuItemProps'

const MenuItem: FC<MenuItemProps> = ({
    label,
    onClick
}) => {
    return (
        <div
            className={'menu-item'}
            onClick={onClick}
        >
            <Text>
                {label}
            </Text>
        </div>
    )
}

export default MenuItem
