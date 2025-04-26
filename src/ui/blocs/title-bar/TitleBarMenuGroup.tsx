import React, { useState } from 'react'
import { useWindowState } from '@hooks/useWindowState'
import './title-bar-menu-group.css'
import Menu from '@components/menu/Menu'
import MenuItem from '@components/menu/MenuItem'

const TitleBarMenuGroup = () => {
    const { isMac } = useWindowState()

    const [openedMenu, setOpenedMenu] = useState<string | null>(null)

    if (isMac) return null

    return (
        <div
            className={'title-bar-menu-group'}
        >
            <Menu
                label={'File'}
                openedMenu={openedMenu}
                setOpenedMenu={setOpenedMenu}
            >
                <MenuItem
                    label={'Exit'}
                    onClick={() => {
                        window.close()
                    }}
                />
            </Menu>
            <Menu
                label={'Edit'}
                openedMenu={openedMenu}
                setOpenedMenu={setOpenedMenu}
            >
                <MenuItem
                    label={'Undo'}
                    onClick={() => {
                        document.execCommand('undo')
                    }}
                />
                <MenuItem
                    label={'Redo'}
                    onClick={() => {
                        document.execCommand('redo')
                    }}
                />
                <MenuItem
                    label={'Cut'}
                    onClick={() => {
                        document.execCommand('cut')
                    }}
                />
                <MenuItem
                    label={'Copy'}
                    onClick={() => {
                        document.execCommand('copy')
                    }}
                />
                <MenuItem
                    label={'Paste'}
                    onClick={() => {
                        document.execCommand('paste')
                    }}
                />
                <MenuItem
                    label={'Delete'}
                    onClick={() => {
                        document.execCommand('delete')
                    }}
                />
            </Menu>
        </div>
    )
}

export default TitleBarMenuGroup
