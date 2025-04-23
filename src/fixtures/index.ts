export type Fixture = {
    id: string;
    name: string;
    language: 'typescript' | 'javascript' | 'json' | 'html' | 'css';
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
        content: '/* Exemple CSS */\nbody {\n  background: #f0f0f0;\n}'
    }
]
