import { DefaultTheme } from '@constants/themes/DefaultTheme'

export const themes = {
    default: DefaultTheme
}

export type ThemeType = keyof typeof themes;
