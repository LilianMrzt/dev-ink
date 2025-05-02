import React, { FC } from 'react'
import './delete-item-modal-content.css'
import Text from '@components/text/Text'
import Button from '@components/buttons/Button'
import { useFolder } from '@hooks/FolderContext'
import { handleDeleteElement } from '@utils/fs-common/FileOrFolderDeleteUtils'
import { DeleteItemModalContentProps } from '@interfaces/ui/blocs/modals/DeleteItemModalContentProps'

const DeleteItemModalContent: FC<DeleteItemModalContentProps> = ({
    activeItem,
    setActiveItem,
    setIsModalOpen
}) => {
    const {
        openFolder,
        setOpenFolder
    } = useFolder()

    const handleDelete = () => {
        if (openFolder?.structure.length &&
            openFolder.structure[0] !== activeItem) {
            void handleDeleteElement(activeItem.path, setOpenFolder)
            setActiveItem(null)
        }
    }

    const handleClose = () => {
        setIsModalOpen(false)
    }

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
                        handleDelete()
                        handleClose()
                    }}
                />
                <Button
                    label={'Cancel'}
                    onClick={handleClose}
                    backgroundColor={'transparent'}
                />
            </div>
        </div>
    )
}

export default DeleteItemModalContent
