import React from 'react'
import './title-bar.css'
import Text from '@components/text/Text'

const TitleBar = () => {
    return (
        <div
            className={'title-bar draggable'}
        >
            <Text>
              Dev-Ink
            </Text>
        </div>
    )
}

export default TitleBar
