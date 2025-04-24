import { LanguageGrammar } from '@interfaces/types/LanguageGrammar'

/**
 * Ensemble des mots-clés reconnus dans un contexte TypeScript.
 */
export const typescriptKeywords = new Set([
    'export',
    'const',
    'class',
    'let',
    'var',
    'function',
    'return',
    'if',
    'else',
    'true',
    'false',
    'import',
    'null'
])

/**
 * Grammaire TypeScript basique définissant les types de tokens reconnus
 * et leurs expressions régulières respectives.
 */
export const typescriptGrammar = [
    {
        type: 'comment',
        regex: /^\/\/.*/
    },
    {
        type: 'string',
        regex: /^(['"`])(.*?)\1/
    },
    {
        type: 'whitespace',
        regex: /^\s+/
    },
    {
        type: 'identifier',
        regex: /^\w+/
    }
]

export const typescript: LanguageGrammar = {
    keywords: typescriptKeywords,
    grammar: typescriptGrammar
}
