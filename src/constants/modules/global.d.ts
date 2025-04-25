export {}

declare global {
    interface Window {
        electronAPI?: {
            setTitleBarColors: (backgroundColor: string, symbolColor: string) => void,
            onFullScreenChanged: (isFullScreen: (fullScreen) => void) => void
        }
    }
}
