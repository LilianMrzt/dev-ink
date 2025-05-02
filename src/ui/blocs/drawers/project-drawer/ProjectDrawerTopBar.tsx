import React, { FC, useState } from 'react'
import './project-drawer-top-bar.css'
import IconButton from '@components/buttons/IconButton'
import { NewFileIcon, NewFolderIcon } from '@resources/Icons'
import Modal from '@components/layout/Modal'
import AddItemModalContent from '@ui/blocs/modals/AddItemModalContent'
import { useFolder } from '@hooks/FolderContext'
import { useEditor } from '@hooks/EditorContext'
import { ProjectDrawerTopBarProps } from '@interfaces/ui/blocs/drawers/project-drawer/ProjectDrawerTopBarProps'
import { handleCreateFolderOrFile } from '@utils/fs-common/fileOrFolderCreationUtils'

const ProjectDrawerTopBar: FC<ProjectDrawerTopBarProps> = ({
    activeItem
}) => {
    const {
        openFolder,
        setOpenFolder
    } = useFolder()

    const { openFile } = useEditor()

    const [isFolderCreationModalOpen, setIsFolderCreationModalOpen] = useState(false)
    const [isFileCreationModalOpen, setIsFileCreationModalOpen] = useState(false)

    const handleSubmit = (
        name: string,
        type: 'file' | 'folder'
    ) => {
        void handleCreateFolderOrFile(
            name,
            type,
            openFolder,
            activeItem,
            setOpenFolder,
            openFile
        )
    }

    return (
        <div
            className={'project-drawer-top-bar'}
        >
            <IconButton
                onClick={() => {
                    if (activeItem) {
                        setIsFolderCreationModalOpen(true)
                    }
                }}
                iconSize={16}
                className={'project-drawer-top-bar-button'}
            >
                <NewFolderIcon/>
            </IconButton>
            <IconButton
                onClick={() => {
                    if (activeItem) {
                        setIsFileCreationModalOpen(true)
                    }
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
                    label={'New folder'}
                    onSubmit={(name) => {
                        void handleSubmit(name, 'folder')
                    }}
                    onClose={() => {
                        setIsFolderCreationModalOpen(false)
                    }}
                />
            </Modal>
            <Modal
                isOpen={isFileCreationModalOpen}
                setIsOpen={setIsFileCreationModalOpen}
            >
                <AddItemModalContent
                    label={'New file'}
                    onSubmit={(name) => {
                        void handleSubmit(name, 'file')
                    }}
                    onClose={() => {
                        setIsFileCreationModalOpen(false)
                    }}
                />
            </Modal>
        </div>
    )
}

export default ProjectDrawerTopBar
