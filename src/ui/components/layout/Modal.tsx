import React, { type FC, Fragment, type ReactNode } from 'react'
import './modal.css'
import { createPortal } from 'react-dom'
import { ModalProps } from '@interfaces/ui/components/layout/ModalProps'

const Modal: FC<ModalProps> = ({
    isOpen,
    setIsOpen,
    children
}): ReactNode => {

    return createPortal(
        <Fragment>
            {isOpen
                ? (
                    <div
                        className={'modal-background'}
                        onClick={() => {
                            setIsOpen(false)
                        }}
                    >
                        <div
                            className={'modal-content'}
                            onClick={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                            }}
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
