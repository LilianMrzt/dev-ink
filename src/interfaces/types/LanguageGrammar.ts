export type GrammarRule = {
    type: string
    regex: RegExp
}

export type LanguageGrammar = {
    keywords: Set<string>
    grammar: GrammarRule[]
}
