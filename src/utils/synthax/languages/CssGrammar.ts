import { LanguageGrammar } from '@interfaces/types/LanguageGrammar'

export const cssGrammar = [
    {
        type: 'comment',
        regex: /^\/\*[\s\S]*?\*\//
    },
    {
        type: 'hex',
        regex: /^#([a-fA-F0-9]{3,8})/
    },
    {
        type: 'function',
        regex: /^(var|rgba?|rgb|calc|clamp|hsl|hsla)\b/
    },
    {
        type: 'custom-property',
        regex: /^--[\w-]+/
    },
    {
        type: 'brace',
        regex: /^[{}()]/
    },
    {
        type: 'colon',
        regex: /^:/
    },
    {
        type: 'semicolon',
        regex: /^;/
    },
    {
        type: 'number',
        regex: /^\d+(\.\d+)?/
    },
    {
        type: 'unit',
        regex: /^(px|em|rem|%|vh|vw|deg|s|ms)\b/
    },
    {
        type: 'value',
        regex: /^(flex|none|block|inline|relative|absolute|auto|inherit)\b/
    },
    {
        type: 'property',
        regex: /^[a-zA-Z-]+(?=\s*:)/
    },
    {
        type: 'symbol',
        regex: /^[:#.@]/
    },
    {
        type: 'selector',
        regex: /^[\w-]+(?=\s*[{(])/
    },
    {
        type: 'whitespace',
        regex: /^\s+/
    },
    {
        type: 'identifier',
        regex: /^[\w-]+/
    }
]

export const css: LanguageGrammar = {
    keywords: new Set(),
    grammar: cssGrammar
}
