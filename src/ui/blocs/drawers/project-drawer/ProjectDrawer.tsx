import React, { ReactNode, useEffect, useState } from 'react'
import ResizableDrawer from '@ui/blocs/side-menu/ResizableDrawer'
import { useFolder } from '@hooks/FolderContext'
import ProjectDrawerFolderItem from '@ui/blocs/drawers/project-drawer/ProjectDrawerFolderItem'
import ProjectFolderFileItem from '@ui/blocs/drawers/project-drawer/ProjectFolderFileItem'
import ProjectDrawerTopBar from '@ui/blocs/drawers/project-drawer/ProjectDrawerTopBar'
import { FolderEntry } from '@interfaces/types/FolderEntry'
import { handleDelete } from '@utils/fs-common/FileOrFolderDeleteUtils'
import Modal from '@components/layout/Modal'
import DeleteItemModalContent from '@ui/blocs/modals/DeleteItemModalContent'

const ProjectDrawer = (): ReactNode => {
    const {
        openFolder,
        setOpenFolder
    } = useFolder()

    const [activeItem, setActiveItem] = useState<FolderEntry | null>(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    /**
     * Lors de l'ouverture, le premier dossier est défini comme activeItem
     */
    useEffect(() => {
        if (openFolder?.structure.length && !activeItem) {
            setActiveItem(openFolder.structure[0])
        }
    }, [openFolder, activeItem])

    /**
     * Gestion de la touche "Suppr"
     */
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Delete' &&
                openFolder?.structure.length &&
                openFolder.structure[0] !== activeItem
            ) {
                e.preventDefault()
                setIsDeleteModalOpen(true)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [activeItem, setOpenFolder])

    if (!openFolder) {
        return null
    }

    return (
        <ResizableDrawer
            storageKey={'ProjectDrawerStorageKey'}
        >
            <ProjectDrawerTopBar
                activeItem={activeItem}
            />
            {openFolder?.structure.map((item) => {
                return (
                    item.isDirectory
                        ? <ProjectDrawerFolderItem
                            key={item.path}
                            item={item}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                        />
                        : <ProjectFolderFileItem
                            key={item.path}
                            item={item}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                        />
                )
            })}
            {activeItem && (
                <Modal
                    isOpen={isDeleteModalOpen}
                    setIsOpen={setIsDeleteModalOpen}
                >
                    <DeleteItemModalContent
                        activeItem={activeItem}
                        onDelete={() => {
                            if (openFolder?.structure.length &&
                                openFolder.structure[0] !== activeItem) {
                                void handleDelete(activeItem.path, setOpenFolder)
                                setActiveItem(null)
                            }
                        }}
                        onClose={() => {
                            setIsDeleteModalOpen(false)
                        }}
                    />
                </Modal>
            )}
        </ResizableDrawer>
    )
}

export default ProjectDrawer
