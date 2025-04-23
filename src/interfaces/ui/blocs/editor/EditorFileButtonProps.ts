import { Fixture } from '@src/fixtures'
import { Dispatch, SetStateAction } from 'react'

export interface EditorFileButtonProps {
    fix: Fixture
    activeId: string
    setActiveId: Dispatch<SetStateAction<string>>
}
