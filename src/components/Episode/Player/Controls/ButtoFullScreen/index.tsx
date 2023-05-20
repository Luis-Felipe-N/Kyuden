import { memo, useCallback } from "react";
import { AiOutlineExpand, AiOutlineCompress } from "react-icons/ai";
import { useVideo } from "../../../../../hooks/useVideo";
import { isMobile } from "../../../../../utils/checkDevice";
import screenfull from "../../../../../utils/screenFull";

function ButtoFullScreenElement() {
    const { containerPlayerEl, playerState, handleFullScreenChange } = useVideo()

    const handleToggleFullscreen = useCallback(() => {
        if (!screenfull.isEnabled) return;

        if (!playerState.isFullScreen) {
          screenfull.request(containerPlayerEl).then(() => {
            handleFullScreenChange(true)
            if (!isMobile()) return;
    
            screen.orientation.lock('landscape');
          });
        } else {
          screenfull.exit().then(() => {
            handleFullScreenChange(false)
            if (!isMobile()) return;
    
            screen.orientation.lock('portrait');

          });
        }
    }, [playerState.isFullScreen, containerPlayerEl, handleFullScreenChange]);

    return (
        <button 
                onClick={handleToggleFullscreen}
            >
              { playerState.isFullScreen ? (
                  <AiOutlineCompress size={20}/>
                ) : (
                  <AiOutlineExpand size={20} />
              )}
            </button>
    )
}

export const ButtoFullScreen = memo(ButtoFullScreenElement)