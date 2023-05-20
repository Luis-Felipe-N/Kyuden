import { useVideo } from "../../../../hooks/useVideo";
import { convertSecondInMinute } from "../../../../utils/convertSecondInMinute";
import { ButtonPlay } from "./ButtonPlay";
import { ButtonVolume } from "./ButtonVolume";
import { Slider } from "./Slider";

import style from './style.module.scss'

export function Controls() {
    const { playerState } = useVideo()

    return (
        <div className={style.controls}>
            <Slider/>
            <div>
                <span className={style.duration}>
                    {convertSecondInMinute(playerState.currentTime)} / {convertSecondInMinute(playerState.durationTime)}
                </span>
                <ButtonPlay />


                <div className={style.options}>
                    <ButtonVolume />
                    {/* <button onClick={onRequestFullScreen}>
                        <AiOutlineExpand size={20} />
                    </button> */}
                </div>
            </div>
        </div>
    )
}