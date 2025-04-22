import React, { FC } from 'react'
import { TextProps } from '@interfaces/ui/components/common/TextProps'
import './text.css'

const Text: FC<TextProps> = ({
    children
}) => {
    return (
        <p
            className={'text'}
        >
            {children}
        </p>
    )
}

export default Text
