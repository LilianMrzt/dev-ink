export type EditType = 'insert' | 'tab' | 'manual'

export type HistorySnapshot = {
    code: string
    cursor: number
    type: EditType
    timestamp: number
}

export type HistoryState = {
    past: HistorySnapshot[]
    future: HistorySnapshot[]
}
