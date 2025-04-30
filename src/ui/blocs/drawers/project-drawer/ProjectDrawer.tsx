import React, { ReactNode, useState } from 'react'
import ResizableDrawer from '@ui/blocs/side-menu/ResizableDrawer'
import { useFolder } from '@hooks/FolderContext'
import ProjectDrawerFolderItem from '@ui/blocs/drawers/project-drawer/ProjectDrawerFolderItem'
import ProjectFolderFileItem from '@ui/blocs/drawers/project-drawer/ProjectFolderFileItem'
import ProjectDrawerTopBar from '@ui/blocs/drawers/project-drawer/ProjectDrawerTopBar'

const ProjectDrawer = (): ReactNode => {
    const { openFolder } = useFolder()

    const [activeItem, setActiveItem] = useState<string | null>(null)

    if (!openFolder) {
        return null
    }

    return (
        <ResizableDrawer
            storageKey={'ProjectDrawerStorageKey'}
        >
            <ProjectDrawerTopBar/>
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
        </ResizableDrawer>
    )
}

export default ProjectDrawer
