import React from 'react'
import './side-menu.css'
import SideMenuButton from '@ui/blocs/side-menu/SideMenuButton'
import { FolderOpenIcon, GitBranchIcon } from '@resources/Icons'

const SideMenu = () => {
    return (
        <div
            className={'side-menu'}
        >
            <SideMenuButton
                onClick={() => {}}
            >
                <FolderOpenIcon/>
            </SideMenuButton>
            <SideMenuButton
                onClick={() => {}}
            >
                <GitBranchIcon/>
            </SideMenuButton>
        </div>
    )
}

export default SideMenu
