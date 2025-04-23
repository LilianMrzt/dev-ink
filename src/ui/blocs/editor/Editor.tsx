import React, { useState } from 'react'
import { Fixture, sampleFixtures } from '@src/fixtures'
import { EditorWindow } from '@ui/blocs/editor/EditorWindow'
import './editor.css'
import EditorFileButton from '@ui/blocs/editor/EditorFileButton'

const Editor = () => {
    const [fixtures, setFixtures] = useState<Fixture[]>(sampleFixtures)
    const [activeId, setActiveId] = useState<string>(fixtures[0].id)

    const handleChange = (id: string, newValue: string | undefined) => {
        setFixtures((prev) => {
            return prev.map((fix) => {
                return (fix.id === id ? {
                    ...fix,
                    content: newValue || ''
                } : fix)
            })
        }
        )
    }

    const activeFixture = fixtures.find((f) => {
        return f.id === activeId
    })!

    return (
        <div
            className={'editor-wrapper'}
        >
            <div
                className={'editor-button-row'}
            >
                {fixtures.map((fix) => {
                    return (
                        <EditorFileButton
                            key={fix.id}
                            fix={fix}
                            activeId={activeId}
                            setActiveId={setActiveId}
                        />
                    )
                })}
            </div>
            <EditorWindow
                fixture={activeFixture}
                onChange={handleChange}
            />
        </div>
    )
}

export default Editor
