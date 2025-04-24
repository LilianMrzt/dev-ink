import { tokenizeLine } from '@utils/synthax/tokenizeLine'

/**
 * Génère du HTML syntaxiquement coloré à partir d'une chaîne de code.
 * Chaque ligne est tokenisée puis convertie en <span> avec une classe spécifique.
 * @param code
 */
export const highlightCode = (code: string): string => {
    return code.split('\n').map((line) => {
        const tokens = tokenizeLine(line)
        return tokens
            .map((t) => {
                const escaped = t.content
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                return `<span class="token-${t.type}">${escaped}</span>`
            })
            .join('')
    }).join('\n')
}
