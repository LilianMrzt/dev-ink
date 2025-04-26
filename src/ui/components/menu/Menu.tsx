import React, { FC, useEffect, useRef } from 'react'
import './menu.css'
import Text from '@components/text/Text'
import { MenuProps } from '@interfaces/ui/components/menu/MenuProps'

const Menu: FC<MenuProps> = ({
    children,
    label,
    openedMenu,
    setOpenedMenu
}) => {
    const menuRef = useRef<HTMLDivElement| null>(null)

    const isOpen = openedMenu === label

    /**
     * Gestion d'un click en dehors du menu et du dropdown
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement

            if (!menuRef.current) {
                return
            }

            if (
                !menuRef.current?.contains(target) &&
                !target.closest('.menu-dropdown')
            ) {
                setOpenedMenu(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    /**
     * Gestion du click sur le menu
     * @param menu
     */
    const handleMenuClick = (menu: string) => {
        setOpenedMenu(menu)
    }

    /**
     * Gestion du hover sur un menu
     */
    const handleMouseEnter = () => {
        if(openedMenu !== null) {
            setOpenedMenu(label)
        }
    }

    return (
        <div
            ref={menuRef}
            className={'menu'}
        >
            <div
                className={`menu-label ${isOpen ? 'active' : ''}`}
                onClick={() => {
                    handleMenuClick(label)
                }}
                onMouseEnter={handleMouseEnter}
            >
                <Text>
                    {label}
                </Text>
            </div>
            {isOpen && (
                <div
                    className={'menu-dropdown'}
                >
                    {children}
                </div>
            )}
        </div>
    )
}

export default Menu
