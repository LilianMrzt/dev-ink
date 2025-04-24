export type Fixture = {
    id: string;
    name: string;
    language: 'typescript' | 'tsx' | 'javascript' | 'json' | 'html' | 'css';
    content: string;
}

export const sampleFixtures: Fixture[] = [
    {
        id: '1',
        name: 'Hello.ts',
        language: 'typescript',
        content: '// Bonjour depuis TypeScript\nconst hello = () => console.log("Hello World");'
    },
    {
        id: '2',
        name: 'Styles.css',
        language: 'css',
        content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--primary);
  overflow: hidden;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

:root {
  --primary: '';
  --secondary: '';
  --tertiary: '';
  --background: '';
  --text: '';
  --textSecondary: '';
  --outline: '';
}

body.theme-changing * {
  transition: none !important;
}`
    },
    {
        id: '3',
        name: 'Styles.json',
        language: 'json',
        content: `{
  "compilerOptions": {
    "target": "es6",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "extends": "./tsconfig.paths.json",
  "include": [
    "src",
    "src/env.d.ts"
  ]
}`
    },
    {
        id: '4',
        name: 'TEST.tsx',
        language: 'tsx',
        content: `import React, { FC } from 'react'
import { TextProps } from '@interfaces/ui/components/text/TextProps'
import './text.css'
import { useTheme } from '@hooks/ThemeContext'

const Text: FC<TextProps> = ({
    children,
    fontSize,
    color
}) => {
    const { theme } = useTheme()

    return (
        <p
            className={'text'}
            style={{
                fontSize: fontSize ?? 13,
                color: color ?? theme.text
            }}
        >
            {children}
        </p>
    )
}

export default Text`
    }
]
