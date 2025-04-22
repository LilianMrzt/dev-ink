import React, { useState } from 'react'
import './side-menu.css'
import SideMenuButton from '@ui/blocs/side-menu/SideMenuButton'
import { FolderOpenIcon, GitBranchIcon } from '@resources/Icons'
import ResizableDrawer from '@ui/blocs/side-menu/ResizableDrawer'
import Text from '@components/common/text/Text'

const SideMenu = () => {
    const [isProjectDrawerOpen, setIsProjectDrawerOpen] = useState(false)
    const [isGitDrawerOpen, setIsGitDrawerOpen] = useState(false)

    /**
     * Ferme explicitement le tiroir Git.
     */
    const closeGitDrawer = () => {
        setIsGitDrawerOpen(false)
    }

    /**
     * Ferme explicitement le tiroir des projets.
     */
    const closeProjectDrawer = () => {
        setIsProjectDrawerOpen(false)
    }

    /**
     * Bascule l’état du tiroir des projets.
     * Ferme le tiroir Git s'il est ouvert.
     */
    const toggleProjectDrawer = () => {
        setIsProjectDrawerOpen(!isProjectDrawerOpen)
        closeGitDrawer()
    }

    /**
     * Bascule l’état du tiroir Git.
     * Ferme le tiroir des projets s'il est ouvert.
     */
    const toggleGitDrawer = () => {
        setIsGitDrawerOpen(!isGitDrawerOpen)
        closeProjectDrawer()
    }



    return (
        <div
            className={'side-menu-wrapper'}
        >
            <div
                className={'side-menu'}
            >
                <SideMenuButton
                    onClick={() => {
                        toggleProjectDrawer()
                    }}
                >
                    <FolderOpenIcon/>
                </SideMenuButton>
                <SideMenuButton
                    onClick={() => {
                        toggleGitDrawer()
                    }}
                >
                    <GitBranchIcon/>
                </SideMenuButton>
            </div>
            {isProjectDrawerOpen && (
                <ResizableDrawer
                    storageKey={'ProjectDrawerStorageKey'}
                >
                    <Text>
                        Test
                    </Text>
                </ResizableDrawer>
            )}
            {isGitDrawerOpen && (
                <ResizableDrawer
                    storageKey={'GitDrawerStorageKey'}
                >
                    <Text>
                        Test
                    </Text>
                </ResizableDrawer>
            )}
        </div>
    )
}

export default SideMenu
