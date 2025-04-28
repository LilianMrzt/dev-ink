import { themes } from '@constants/Themes'

export const filesIconColor = (
    itemName: string,
    theme: typeof themes.default
): string => {
    const ext = itemName.split('.').pop()?.toLowerCase()

    switch (ext) {
    case 'css':
        return '#ad6c79'
    case 'ts':
    case 'tsx':
        return '#3f93b0'
    case 'js':
    case 'jsx':
        return '#FED000'
    default:
        return theme.text
    }
}
