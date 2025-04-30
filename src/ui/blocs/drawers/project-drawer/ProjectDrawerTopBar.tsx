import React, { useState } from 'react'
import './project-drawer-top-bar.css'
import IconButton from '@components/buttons/IconButton'
import { NewFileIcon, NewFolderIcon } from '@resources/Icons'
import Modal from '@components/layout/Modal'
import AddItemModalContent from '@ui/blocs/drawers/project-drawer/AddItemModalContent'

const ProjectDrawerTopBar = () => {
    const [isFolderCreationModalOpen, setIsFolderCreationModalOpen] = useState(false)
    const [isFileCreationModalOpen, setIsFileCreationModalOpen] = useState(false)
    return (
        <div
            className={'project-drawer-top-bar'}
        >
            <IconButton
                onClick={() => {
                    setIsFolderCreationModalOpen(true)
                }}
                iconSize={16}
                className={'project-drawer-top-bar-button'}
            >
                <NewFolderIcon/>
            </IconButton>
            <IconButton
                onClick={() => {
                    setIsFileCreationModalOpen(true)
                }}
                iconSize={16}
                className={'project-drawer-top-bar-button'}
            >
                <NewFileIcon/>
            </IconButton>
            <Modal
                isOpen={isFolderCreationModalOpen}
                setIsOpen={setIsFolderCreationModalOpen}
            >
                <AddItemModalContent
                    label={'New directory'}
                />
            </Modal>
            <Modal
                isOpen={isFileCreationModalOpen}
                setIsOpen={setIsFileCreationModalOpen}
            >
                <AddItemModalContent
                    label={'New file'}
                />
            </Modal>
        </div>
    )
}

export default ProjectDrawerTopBar
