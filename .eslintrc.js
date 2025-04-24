module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks'
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        'react/prop-types': 'off',
        'object-curly-spacing': ['error', 'always'],
        'quotes': ['error', 'single', { avoidEscape: true }],
        'semi': ['error', 'never'],
        'arrow-body-style': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'space-infix-ops': 'error',
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
        'arrow-spacing': ['error', { before: true, after: true }],
        'brace-style': ['error', '1tbs', { allowSingleLine: false }],
        'no-multi-spaces': ['error'],
        'space-before-blocks': ['error', { functions: 'never', keywords: 'always', classes: 'always' }]
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                indent: ['error', 4]
            }
        }
    ]
}
