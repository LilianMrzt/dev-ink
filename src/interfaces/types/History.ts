export type HistorySnapshot = {
    code: string
    cursor: number
}

export type HistoryState = {
    past: HistorySnapshot[]
    future: HistorySnapshot[]
}
