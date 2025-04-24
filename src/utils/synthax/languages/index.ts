import { typescript } from '@utils/synthax/languages/TypescriptGrammar'
import { LanguageGrammar } from '@interfaces/types/LanguageGrammar'
import { css } from '@utils/synthax/languages/CssGrammar'

const languageMap: Record<string, LanguageGrammar> = {
    typescript,
    javascript: typescript,
    css
}

export const getGrammar = (lang: string): LanguageGrammar => {
    return languageMap[lang] || languageMap.typescript
}
