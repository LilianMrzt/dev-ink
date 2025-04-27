export interface FolderEntry {
    name: string
    path: string
    isDirectory: boolean
    children?: FolderEntry[]
}
