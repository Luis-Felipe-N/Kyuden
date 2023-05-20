import { memo, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useVideo } from "../../../../../hooks/useVideo";

function ButtonPlayElement() {
    const { videoEl, containerPlayerEl, playerState } = useVideo()

    function onTogglePauseVideo() {
        if (!videoEl) return

        if (playerState.isPlaying) {
            videoEl.pause()
        } else {
            videoEl.play()
        }
    }

    useEffect(() => {
        if (!videoEl) return 

        videoEl.addEventListener("click", onTogglePauseVideo)
        return () => {
            videoEl.removeEventListener("click", onTogglePauseVideo)   
        }
    })

    return (
        <button 
                onClick={onTogglePauseVideo}
            >
                { playerState.isPlaying ? (
                    <FaPause size={20} />
                    ) : (
                    <FaPlay size={20} />
                )}
            </button>
    )
}

export const ButtonPlay = memo(ButtonPlayElement)