import { memo } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

interface IButtonPlayProps {
    isPlaying: boolean;
    onTogglePauseVideo: () => void
}

function ButtonPlayElement({isPlaying, onTogglePauseVideo}: IButtonPlayProps) {
    return (
        <button 
                onClick={onTogglePauseVideo}
            >
                { isPlaying ? (
                    <FaPause size={20} />
                    ) : (
                    <FaPlay size={20} />
                )}
            </button>
    )
}

export const ButtonPlay = memo(ButtonPlayElement)