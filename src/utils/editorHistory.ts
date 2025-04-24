import { HistorySnapshot, HistoryState } from '@interfaces/types/History'

/**
 * Initialise un nouvel historique d'édition vide.
 */
export const createHistory = (): HistoryState => {
    return {
        past: [],
        future: []
    }
}

/**
 *  * Enregistre un nouveau changement dans l'historique.
 *
 * @param history
 * @param snapshot
 */
export const pushHistory = (
    history: HistoryState,
    snapshot: HistorySnapshot
) => {
    const last = history.past[history.past.length - 1]
    if (last?.code === snapshot.code) return

    history.past.push(snapshot)
    history.future = []
}

/**
 * Annule la dernière modification en récupérant l'état précédent.
 *
 * @param history
 * @param current
 */
export const undo = (
    history: HistoryState,
    current: HistorySnapshot
): HistorySnapshot | null => {
    if (history.past.length === 0) return null
    const prev = history.past.pop()!
    history.future.unshift(current)
    return prev
}

/**
 * Rétablit une modification annulée.
 *
 * @param history
 */
export const redo = (history: HistoryState): HistorySnapshot | null => {
    if (history.future.length === 0) return null
    const next = history.future.shift()!
    history.past.push(next)
    return next
}
