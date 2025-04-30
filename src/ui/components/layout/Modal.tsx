import React, { type FC, Fragment, type ReactNode, useEffect, useRef } from 'react'
import './modal.css'
import { createPortal } from 'react-dom'
import { ModalProps } from '@interfaces/ui/components/layout/ModalProps'

const Modal: FC<ModalProps> = ({
    isOpen,
    setIsOpen,
    children
}): ReactNode => {
    const modalRef = useRef<HTMLDivElement| null>(null)

    /**
     * Gestion d'un click en dehors du menu et du dropdown
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement

            if (!modalRef.current) {
                return
            }

            if (
                !modalRef.current?.contains(target) &&
                !target.closest('.modal-content')
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return createPortal(
        <Fragment>
            {isOpen
                ? (
                    <div
                        ref={modalRef}
                        className={'modal-background'}
                    >
                        <div
                            className={'modal-content'}
                        >
                            {children}
                        </div>
                    </div>
                )
                : null}
        </Fragment>,
        document.body
    )
}

export default Modal
