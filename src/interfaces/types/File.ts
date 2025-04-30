export interface File {
    id: string;
    path: string;
    name: string;
    content: string;
    isModified?: boolean
}
