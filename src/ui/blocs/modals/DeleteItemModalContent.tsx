import React, { FC } from 'react'
import './delete-item-modal-content.css'
import Text from '@components/text/Text'
import { FolderEntry } from '@interfaces/types/FolderEntry'
import Button from '@components/buttons/Button'

export interface DeleteItemModalContentProps {
    activeItem: FolderEntry
    onDelete: () => void
    onClose: () => void
}

const DeleteItemModalContent: FC<DeleteItemModalContentProps> = ({
    activeItem,
    onClose,
    onDelete
}) => {
    return (
        <div
            className={'delete-item-modal-content'}
        >
            <Text
                fontSize={18}
                textAlign={'start'}
                width={'100%'}
            >
                Delete
            </Text>
            {activeItem.isDirectory ? (
                <div
                    className={'delete-item-modal-content-description'}
                >
                    <Text
                        wrap
                        width={'100%'}
                        textAlign={'start'}
                    >
                        {`Delete directory "${activeItem.name}"?`}
                    </Text>
                    <Text
                        wrap
                        width={'100%'}
                        textAlign={'start'}
                    >
                        {`All files and subdirectories in "${activeItem.name}" will be deleted.`}
                    </Text>
                    <Text
                        wrap
                        width={'100%'}
                        textAlign={'start'}
                    >
                        You might not be able to fully undo this operation!
                    </Text>
                </div>
            ) : (
                <Text>
                    {`Delete file "${activeItem.name}"?`}
                </Text>
            )}
            <div
                className={'delete-item-modal-content-buttons'}
            >
                <Button
                    label={'Delete'}
                    onClick={() => {
                        onDelete()
                        onClose()
                    }}
                />
                <Button
                    label={'Cancel'}
                    onClick={onClose}
                    backgroundColor={'transparent'}
                />
            </div>
        </div>
    )
}

export default DeleteItemModalContent
