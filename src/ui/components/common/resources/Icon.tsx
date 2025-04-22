import React, { type FC, type ReactNode } from 'react'
import './icon.css'
import { IconProps } from '@interfaces/ui/components/common/resources/IconProps'

const Icon: FC<IconProps> = ({
    children,
    size = 16,
    color,
    backgroundColor,
    padding
}): ReactNode => {
    return (
        <div
            className={'icon'}
            style={{
                height: size,
                width: size,
                minWidth: size,
                minHeight: size,
                color,
                backgroundColor,
                padding
            }}
        >
            {children}
        </div>
    )
}

export default Icon
