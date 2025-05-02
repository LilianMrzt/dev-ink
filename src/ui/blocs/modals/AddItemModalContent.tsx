import React, { FC, useEffect, useRef } from 'react'
import Text from '@components/text/Text'
import './add-item-modal-content.css'
import { AddItemModalContentProps } from '@interfaces/ui/blocs/modals/AddItemModalContentProps'

const AddItemModalContent: FC<AddItemModalContentProps> = ({
    label,
    onClose,
    onSubmit
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    /**
     * Focus l'input lors du render
     */
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    /**
     * Gère l'appuie des touches pour valider ou annuler la creation
     */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onSubmit(inputRef.current?.value ?? '')
                onClose()
            } else if (e.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handler)
        return () => {
            return window.removeEventListener('keydown', handler)
        }
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
