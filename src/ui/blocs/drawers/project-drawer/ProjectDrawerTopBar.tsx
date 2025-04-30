import React, { FC, useState } from 'react'
import './project-drawer-top-bar.css'
import IconButton from '@components/buttons/IconButton'
import { NewFileIcon, NewFolderIcon } from '@resources/Icons'
import Modal from '@components/layout/Modal'
import AddItemModalContent from '@ui/blocs/drawers/project-drawer/AddItemModalContent'
import { useFolder } from '@hooks/FolderContext'
import { useEditor } from '@hooks/EditorContext'
import { ProjectDrawerTopBarProps } from '@interfaces/ui/blocs/drawers/project-drawer/ProjectDrawerTopBarProps'
import { getTargetDir, isValidName, normalizePath, sanitizeName } from '@utils/fileCreationUtils'

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

    /**
     * Crée un fichier ou dossier dans le répertoire de l'element actif du drawer
     * @param name
     * @param type
     */
    const handleCreate = async (name: string, type: 'file' | 'folder') => {
        if (!openFolder || !activeItem) return

        const cleanName = sanitizeName(name, type)
        if (!isValidName(cleanName, type)) {
            console.warn('Nom invalide.')
            return
        }

        const fullPath = normalizePath(`${getTargetDir(activeItem)}/${cleanName}`)

        const exists = openFolder.structure.some((entry) => {
            return entry.path === fullPath
        })
        if (exists) {
            console.warn('Un élément existe déjà à cet emplacement.')
            return
        }

        const result =
            type === 'file'
                ? await window.electronAPI?.createFile(fullPath)
                : await window.electronAPI?.createFolder(fullPath)

        if (result?.success) {
            const refreshed = await window.electronAPI?.getLastOpenedFolder()
            if (refreshed) {
                setOpenFolder(await refreshed)

                if (type === 'file') {
                    const content = await window.electronAPI?.readFile(fullPath) ?? ''
                    openFile({
                        id: fullPath,
                        name: cleanName,
                        path: fullPath,
                        content,
                        isModified: false
                    })
                }
            }
        }
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
                        void handleCreate(name, 'folder')
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
                        void handleCreate(name, 'file')
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
