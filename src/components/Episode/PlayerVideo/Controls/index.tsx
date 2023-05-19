import { FaPause, FaPlay, FaVolumeUp, FaExpandAlt } from "react-icons/fa";
import { AiOutlineExpand } from "react-icons/ai"
import style from './style.module.scss'
import { Slider } from "../Slider";
import { ButtonVolume } from './ButtonVolume'
import { ButtonPlay } from "./ButtonPlay";
import { convertSecondInMinute } from "../../../../utils/convertSecondInMinute";

interface IControlsProps {
    onTogglePauseVideo: () => void;
    onChangePercentage: (event: number) => void;
    onChangeVolume: (event: number) => void;
    onRequestFullScreen: () => void;
    percentage: number;
    duration: number;
    currentTime: number
    isPlaying: boolean;
}

export function Controls({ isPlaying, duration, currentTime, onChangeVolume, onTogglePauseVideo, onChangePercentage, onRequestFullScreen, percentage }: IControlsProps) {
    
    return (
        <div className={style.controls}>
            <Slider
                currentTime={currentTime}
                percentage={percentage}
                onChangePercentage={onChangePercentage}
            />
            <div>
                <span className={style.duration}>
                    {convertSecondInMinute(currentTime)} / {convertSecondInMinute(duration)}
                </span>
                <ButtonPlay 
                    isPlaying={isPlaying}
                    onTogglePauseVideo={onTogglePauseVideo}
                />


                <div className={style.options}>
                    <ButtonVolume
                        onChangeVolume={onChangeVolume}
                    />
                    <button onClick={onRequestFullScreen}>
                        <AiOutlineExpand size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}