import React, { type ReactNode } from 'react'
import './App.css'
import Header from '@ui/blocs/header/Header'
import SideMenu from '@ui/blocs/side-menu/SideMenu'
import BottomMenu from '@ui/blocs/bottom-menu/BottomMenu'
import Editor from '@ui/blocs/editor/Editor'

const App = (): ReactNode => {
    return (
        <div
            className={'app'}
        >
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
