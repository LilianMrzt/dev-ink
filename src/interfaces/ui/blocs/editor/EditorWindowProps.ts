import { Fixture } from '@src/fixtures'

export interface EditorWindowProps {
    fixture: Fixture;
    onChange: (id: string, value: string) => void;
}
