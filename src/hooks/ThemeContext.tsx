import React, { createContext, useContext, useState, useEffect, type FC, type ReactNode } from 'react'
import { themes, ThemeType } from '@constants/Themes'

interface ThemeContextProps {
    themeName: ThemeType
    theme: typeof themes.default
    setNewTheme: (newThemeName: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [themeName, setThemeName] = useState<ThemeType>('default')

    const theme = themes[themeName]

    /**
     * Fonction pour affecter le nouveau theme de l'application
     * @param newThemeName
     */
    const setNewTheme = (newThemeName: ThemeType): void => {
        document.body.classList.add('theme-changing')
        setTimeout(() => {
            document.body.classList.remove('theme-changing')
        }, 50)

        setThemeName(newThemeName)
    }

    /**
     * UseEffect pour affecter les couleurs du theme au root dans le index.css
     */
    useEffect(() => {
        const root = document.documentElement
        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value)
        })
    }, [theme])

    return (
        <ThemeContext.Provider
            value={{
                themeName,
                theme,
                setNewTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within an ThemeProvider')
    }
    return context
}
