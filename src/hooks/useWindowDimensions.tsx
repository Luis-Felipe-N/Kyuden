import { useCallback, useEffect, useState } from 'react'

export default function useWindowDimensions() {
  const [hasWindow, seHasWindow] = useState(false)
  useEffect(() => seHasWindow(true), [])

  const getDimensions = useCallback(() => {
    const width = hasWindow && window.innerWidth
    const height = hasWindow && window.innerHeight

    return [width, height]
  }, [hasWindow])

  const [windowDimensions, setWindowDimensions] = useState(getDimensions())

  useEffect(() => {
    if (hasWindow) {
      setWindowDimensions(getDimensions())
    }
  }, [hasWindow, getDimensions])

  return windowDimensions
}
