import { useVideo } from '../../../../../hooks/useVideo'
import { SliderRadixUI } from '../../../../SliderRadixUI'

export function Slider() {
  const { videoEl, playerState } = useVideo()

  function handleChangePercentage(value: number[]) {
    if (!videoEl) return

    const newDuration = (videoEl.duration / 100) * Number(...value)
    if (newDuration) {
      videoEl.currentTime = newDuration
    }
  }

  return (
    <>
      <SliderRadixUI
        value={[playerState.percentage]}
        handleChangeValue={handleChangePercentage}
        min={0}
        max={100}
        step={1}
        aria-label="Tempo de video"
      />
    </>
  )
}
