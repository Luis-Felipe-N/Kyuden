import { useCallback, useEffect, useRef, useState } from 'react'
import { useVideo } from '../../../../hooks/useVideo'
import { convertSecondInMinute } from '../../../../utils/convertSecondInMinute'
import { ButtonFullScreen } from './ButtonFullScreen'
import { ButtonPassEpisode } from './ButtonPassEpisode'
import { ButtonPlay } from './ButtonPlay'
import { ButtonVolume } from './ButtonVolume'
import { Slider } from './Slider'

import style from './style.module.scss'

export function Controls() {
  const { playerState, videoEl } = useVideo()
  const [showControls, setShowControls] = useState(false)

  const controlsRef = useRef<HTMLDivElement>(null)

  // @ts-ignore
  const hiddenControlsSetInterval = useRef<typeof window.settimeout>()

  const handleHiddenControls = useCallback(() => {
    hiddenControlsSetInterval.current = setTimeout(() => {
      setShowControls(false)
    }, 4000) // 2s
  }, [])

  const handleShowControls = useCallback(() => {
    clearTimeout(hiddenControlsSetInterval.current)
    setShowControls(true)

    handleHiddenControls()
  }, [handleHiddenControls])

  useEffect(() => {
    if (!videoEl || !controlsRef.current) return

    const controlsEl = controlsRef.current

    videoEl.addEventListener('mousemove', handleShowControls)
    videoEl.addEventListener('mouseenter', handleShowControls)
    controlsEl.addEventListener('mousemove', handleShowControls)
    controlsEl.addEventListener('mouseenter', handleShowControls)

    return () => {
      videoEl.removeEventListener('mousemove', handleShowControls)
      videoEl.removeEventListener('mouseenter', handleShowControls)

      if (controlsEl) {
        controlsEl.removeEventListener('mousemove', handleShowControls)
        controlsEl.removeEventListener('mouseenter', handleShowControls)
      }
    }
  }, [videoEl, handleShowControls])

  return (
    <>
      <div
        ref={controlsRef}
        className={`${style.controls} ${!showControls ? style.hidden : ''}`}
      >
            <ButtonPassEpisode />

        <Slider />
        <div>
          <span className={style.duration}>
            {playerState.currentTime
              ? convertSecondInMinute(playerState.currentTime)
              : '00:00'}{' '}
            /{' '}
            {playerState.durationTime
              ? convertSecondInMinute(playerState.durationTime)
              : '00:00'}
          </span>
          <ButtonPlay />

          <div className={style.options}>
            <ButtonVolume />
            <ButtonFullScreen />
          </div>
        </div>
      </div>
    </>
  )
}
