import { memo, useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import { SliderRadixUI } from "../../../../SliderRadixUI";
import style from './style.module.scss'
import { useClickOutSide } from "../../../../../hooks/useClickOutSide";

interface IButtonVolumeProps {
    onChangeVolume: (value: number) => void;
}

function ButtonVolumeElement({ onChangeVolume }: IButtonVolumeProps) {
    const [ volume, setVolume ] = useState(100)
    const [ showVolumeControls, setShowVolumeControls ] = useState(false)
    const controlsVolumeRef = useRef<HTMLDivElement>(null)
    const { onClickOutSide } = useClickOutSide()

    useEffect(() => {
        onChangeVolume(volume)
    }, [volume, onChangeVolume])

    if (showVolumeControls && controlsVolumeRef.current) {
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
                    // value={[volume]}
                    handleChangeValue={([value]) => setVolume(value)}
                    min={0} 
                    max={1} 
                    step={0.1} 
                    defaultValue={[1]}
                    aria-label="Tempo de video"
                />
            </div>
        </div>
    )
}

export const ButtonVolume =  memo(ButtonVolumeElement)