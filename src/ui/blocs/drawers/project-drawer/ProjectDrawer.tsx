import React, { ReactNode } from 'react'
import ResizableDrawer from '@ui/blocs/side-menu/ResizableDrawer'
import { useFolder } from '@hooks/FolderContext'
import ProjectDrawerFolderItem from '@ui/blocs/drawers/project-drawer/ProjectDrawerFolderItem'
import ProjectFolderFileItem from '@ui/blocs/drawers/project-drawer/ProjectFolderFileItem'

const ProjectDrawer = (): ReactNode => {
    const { openFolder } = useFolder()

    if (!openFolder) {
        return null
    }

    return (
        <ResizableDrawer
            storageKey={'ProjectDrawerStorageKey'}
        >
            {openFolder.structure.map((item) => {
                return (
                    item.isDirectory
                        ? <ProjectDrawerFolderItem
                            key={item.path}
                            item={item}
                        />
                        : <ProjectFolderFileItem
                            key={item.path}
                            item={item}
                        />
                )
            })}
        </ResizableDrawer>
    )
}

export default ProjectDrawer
