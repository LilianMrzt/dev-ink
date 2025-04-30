import React, { FC, useEffect, useRef } from 'react'
import Text from '@components/text/Text'
import './add-item-modal-content.css'

export interface AddItemModalContentProps {
    label: string
}

const AddItemModalContent: FC<AddItemModalContentProps> = ({
    label
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <div
            className={'add-item-modal-content'}
        >
            <div
                className={'add-item-modal-content-title'}
            >
                <Text>
                    {label}
                </Text>
            </div>
            <input
                ref={inputRef}
                className={'add-item-modal-content-input'}
                spellCheck={false}
                placeholder={'Name'}
            />
        </div>
    )
}

export default AddItemModalContent
