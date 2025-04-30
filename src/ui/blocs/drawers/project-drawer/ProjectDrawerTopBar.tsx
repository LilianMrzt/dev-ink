import React from 'react'
import './project-drawer-top-bar.css'
import IconButton from '@components/buttons/IconButton'
import { NewFileIcon, NewFolderIcon } from '@resources/Icons'

const ProjectDrawerTopBar = () => {
    return (
        <div
            className={'project-drawer-top-bar'}
        >
            <IconButton
                onClick={() => {}}
                iconSize={16}
                className={'project-drawer-top-bar-button'}
            >
                <NewFolderIcon/>
            </IconButton>
            <IconButton
                onClick={() => {}}
                iconSize={16}
                className={'project-drawer-top-bar-button'}
            >
                <NewFileIcon/>
            </IconButton>
        </div>
    )
}

export default ProjectDrawerTopBar
