import { CodeToken } from '@interfaces/types/CodeToken'
import { grammar, keywords } from '@utils/synthax/languages/TypescriptGrammar'

/**
 * Découpe une ligne de code en une liste de tokens typés selon la grammaire définie.
 * Applique une priorité aux mots-clés s’ils sont identifiés comme identifiants.
 *
 * @param line
 */
export const tokenizeLine = (line: string): CodeToken[] => {
    const tokens: CodeToken[] = []
    let input = line

    while (input.length > 0) {
        let matched = false
        for (const { regex, type } of grammar) {
            const match = input.match(regex)
            if (match) {
                const content = match[0]
                if (type === 'identifier' && keywords.has(content)) {
                    tokens.push({
                        type: 'keyword',
                        content
                    })
                } else {
                    tokens.push({
                        type,
                        content
                    })
                }
                input = input.slice(content.length)
                matched = true
                break
            }
        }

        if (!matched) {
            tokens.push({
                type: 'unknown',
                content: input[0]
            })
            input = input.slice(1)
        }
    }

    return tokens
}
