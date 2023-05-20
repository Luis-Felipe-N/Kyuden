import { memo, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
// import { Us } from "../../../../hooks/useClickOutSide";
import style from './style.module.scss'
import { useVideo } from "../../../../../hooks/useVideo";
import { useClickOutSide } from "../../../../../hooks/useClickOutSide";
import { SliderRadixUI } from "../../../../SliderRadixUI";



function ButtonVolumeElement() {
    const [ showVolumeControls, setShowVolumeControls ] = useState(false)
    const controlsVolumeRef = useRef<HTMLDivElement>(null)
    const { onClickOutSide } = useClickOutSide()

    const { playerState, videoEl } = useVideo()

    function handleVolume(value: number[]) {
        if (!videoEl) return
        console.log(playerState.volume)
        videoEl.volume = Number(...value) 
    }

    if (showVolumeControls && controlsVolumeRef) {
        onClickOutSide(controlsVolumeRef, showVolumeControls, () => {
            setShowVolumeControls(false)
        })
    }

    return (
        <div className={style.containerVolume} ref={controlsVolumeRef}>
            <button
                onClick={() => setShowVolumeControls(!showVolumeControls)}
            >
                <FaVolumeUp size={20} />
            </button>

            <div className={showVolumeControls ? `${style.volume} ${style.showVolumeControls}`: style.volume}>
                <SliderRadixUI
                    value={[playerState.volume]}
                    handleChangeValue={handleVolume}
                    min={0} 
                    max={1} 
                    step={0.1} 
                    // defaultValue={[1]}
                    aria-label="Volume do video"
                />
            </div>
        </div>
    )
}

export const ButtonVolume =  memo(ButtonVolumeElement)