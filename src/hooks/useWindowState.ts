import { useEffect, useState } from 'react'

export const useWindowState = () => {
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [isMac, setIsMac] = useState(false)

    useEffect(() => {
        setIsMac(navigator.userAgent.includes('Mac'))

        if (window.electronAPI?.onFullScreenChanged) {
            window.electronAPI.onFullScreenChanged((fullScreen) => {
                setIsFullScreen(fullScreen)
            })
        }
    }, [])

    return { isFullScreen, isMac }
}
