import React, { type ReactNode } from 'react'
import './App.css'
import Header from '@ui/blocs/header/Header'
import SideMenu from '@ui/blocs/side-menu/SideMenu'
import BottomMenu from '@ui/blocs/bottom-menu/BottomMenu'
import Editor from '@ui/blocs/editor/Editor'
import TitleBar from '@ui/blocs/title-bar/TitleBar'
import { useWindowState } from '@hooks/useWindowState'

const App = (): ReactNode => {
    const { isFullScreen, isMac } = useWindowState()
    return (
        <div
            className={'app'}
        >
            {!(isMac && isFullScreen) && (
                <TitleBar />
            )}
            <Header/>
            <main
                className={'main'}
            >
                <SideMenu/>
                <Editor/>
            </main>
            <BottomMenu/>
        </div>
    )
}

export default App
