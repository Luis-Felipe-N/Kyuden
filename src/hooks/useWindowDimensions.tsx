import { useCallback, useEffect, useState } from "react"

export default function useWindowDimesions() {
    const [hasWindow, seHasWindow] = useState(false)
    useEffect(() => seHasWindow(true), [])

    const getDimesions = useCallback(() => {
        const width = hasWindow && window.innerWidth
        const height = hasWindow && window.innerHeight

        return [width, height]
    }, [hasWindow])

    const [windowDimesions, setWindowDimesions] = useState(getDimesions())

    useEffect(() => {
        if (hasWindow) {
            setWindowDimesions(getDimesions())
        }
    }, [hasWindow, getDimesions])

    return windowDimesions
}