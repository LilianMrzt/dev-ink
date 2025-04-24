/**
 * Ensemble des mots-clés reconnus dans un contexte TypeScript.
 */
export const keywords = new Set([
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
    'null'
])

/**
 * Grammaire TypeScript basique définissant les types de tokens reconnus
 * et leurs expressions régulières respectives.
 */
export const grammar = [
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
