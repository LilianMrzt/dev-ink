import React, { type ReactNode } from 'react'
import './App.css'
import Header from '@ui/blocs/header/Header'
import SideMenu from '@ui/blocs/side-menu/SideMenu'
import BottomMenu from '@ui/blocs/bottom-menu/BottomMenu'

const App = (): ReactNode => (
    <div className="App">
        <Header/>
        <SideMenu/>
        <BottomMenu/>
    </div>
)

export default App
