import { Fixture } from '@src/fixtures'
import { Dispatch, RefObject, SetStateAction } from 'react'

export interface EditorTextAreaProps {
    code: string
    fixture: Fixture
    setCode: Dispatch<SetStateAction<string>>
    linesRef: RefObject<HTMLDivElement | null>
    onChange: (id: string, value: string) => void;
}
