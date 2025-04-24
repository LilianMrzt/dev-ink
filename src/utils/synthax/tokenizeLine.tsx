import { CodeToken } from '@interfaces/types/CodeToken'
import { getGrammar } from '@utils/synthax/languages'

/**
 * Découpe une ligne de code en une liste de tokens typés selon la grammaire définie.
 * Applique une priorité aux mots-clés s’ils sont identifiés comme identifiants.
 *
 * @param line
 * @param lang
 */
export const tokenizeLine = (line: string, lang: string): CodeToken[] => {
    const { keywords, grammar } = getGrammar(lang)
    const tokens: CodeToken[] = []
    let input = line

    while (input.length > 0) {
        let matched = false
        for (const { regex, type } of grammar) {
            const match = input.match(regex)
            if (match) {
                const content = match[0]
                const finalType = (type === 'identifier' && keywords.has(content)) ? 'keyword' : type
                tokens.push({
                    type: finalType,
                    content
                })
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
