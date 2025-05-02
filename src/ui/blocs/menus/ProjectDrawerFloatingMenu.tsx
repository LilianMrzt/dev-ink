import React, { FC, useState } from 'react'
import MenuItem from '@components/menu/MenuItem'
import FloatingMenu from '@components/menu/FloatingMenu'
import { ProjectDrawerFloatingMenuProps } from '@interfaces/ui/blocs/menus/ProjectDrawerFloatingMenuProps'
import { useFolder } from '@hooks/FolderContext'
import { useEditor } from '@hooks/EditorContext'
import Modal from '@components/layout/Modal'
import AddItemModalContent from '@ui/blocs/drawers/project-drawer/AddItemModalContent'
import { handleCreateFolderOrFile } from '@utils/fileOrFolderCreationUtils'

const ProjectDrawerFloatingMenu: FC<ProjectDrawerFloatingMenuProps> = ({
    isVisible,
    setIsVisible,
    cursorPosition,
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
        <>
            <FloatingMenu
                isVisible={isVisible}
                cursorPosition={cursorPosition}
                onClose={() => {
                    return setIsVisible(false)
                }}
            >
                <MenuItem
                    label={'New folder'}
                    onClick={() => {
                        if (activeItem) {
                            setIsFolderCreationModalOpen(true)
                            setIsVisible(false)
                        }
                    }}
                />
                <MenuItem
                    label={'New file'}
                    onClick={() => {
                        if (activeItem) {
                            setIsFileCreationModalOpen(true)
                            setIsVisible(false)
                        }
                    }}
                />
            </FloatingMenu>

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
        </>
    )
}

export default ProjectDrawerFloatingMenu
