// @ts-ignore
import CracoAlias from 'craco-alias'

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.paths.json'
            }
        }
    ]
}
