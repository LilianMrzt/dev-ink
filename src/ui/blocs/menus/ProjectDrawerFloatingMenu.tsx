import React, { FC } from 'react'
import MenuItem from '@components/menu/MenuItem'
import FloatingMenu from '@components/menu/FloatingMenu'
import { ProjectDrawerFloatingMenuProps } from '@interfaces/ui/blocs/menus/ProjectDrawerFloatingMenuProps'

const ProjectDrawerFloatingMenu: FC<ProjectDrawerFloatingMenuProps> = ({
    isVisible,
    setIsVisible,
    cursorPosition
}) => {
    return (
        <FloatingMenu
            isVisible={isVisible}
            cursorPosition={cursorPosition}
            onClose={() => {
                return setIsVisible(false)
            }}
        >
            <MenuItem
                label={'Option 1'}
                onClick={() => {
                    return console.log('Option 1')
                }}
            />
            <MenuItem
                label={'Option 2'}
                onClick={() => {
                    return console.log('Option 2')
                }}
            />
        </FloatingMenu>
    )
}

export default ProjectDrawerFloatingMenu
