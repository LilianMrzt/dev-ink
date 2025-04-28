import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider } from '@hooks/ThemeContext'
import '@styles/prism-custom-theme.css'
import { FolderProvider } from '@hooks/FolderContext'
import { EditorProvider } from '@hooks/EditorContext'

const root = ReactDOM.createRoot(
    document.getElementById('root')!
)

root.render(
    <React.StrictMode>
        <FolderProvider>
            <EditorProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </EditorProvider>
        </FolderProvider>
    </React.StrictMode>
)
