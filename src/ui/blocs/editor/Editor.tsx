import React from 'react'
import { EditorWindow } from '@ui/blocs/editor/EditorWindow'
import './editor.css'
import EditorFileButton from '@ui/blocs/editor/EditorFileButton'
import { useEditor } from '@hooks/EditorContext'

const Editor = () => {
    const {
        openedFiles,
        activeFileId,
        setActiveFileId
    } = useEditor()

    return (
        <div
            className={'editor-wrapper'}
        >
            <div
                className={'editor-button-row'}
            >
                {openedFiles.map((openedFile) => {
                    return (
                        <EditorFileButton
                            key={openedFile.id}
                            openedFile={openedFile}
                            activeId={activeFileId}
                            setActiveId={setActiveFileId}
                        />
                    )
                })}
            </div>
            <EditorWindow/>
        </div>
    )
}

export default Editor
