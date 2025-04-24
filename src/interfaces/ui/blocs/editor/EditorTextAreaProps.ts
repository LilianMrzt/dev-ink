import { Fixture } from '@src/fixtures'
import { RefObject } from 'react'

export interface EditorTextAreaProps {
    code: string
    fixture: Fixture
    setCode: (code: string) => void
    linesRef: RefObject<HTMLDivElement | null>
    onChange: (id: string, value: string) => void;
}
