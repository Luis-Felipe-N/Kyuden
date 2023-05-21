import { memo, useCallback } from "react";
import { FaCompress, FaExpand } from "react-icons/fa";
import { useVideo } from "../../../../../hooks/useVideo";
import { isMobile } from "../../../../../utils/checkDevice";
import screenfull from "../../../../../utils/screenFull";

import style from './style.module.scss'

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
              className={style.btn}
              onClick={handleToggleFullscreen}
              title={
                 playerState.isFullScreen ? (
                  'Sair do modo tela cheia'
                ) : (
                  'Tela cheia'
              )}

              aria-label={
                playerState.isFullScreen ? (
                 'Sair do modo de tela cheia'
               ) : (
                 'Entrar no modo de Tela cheia'
             )}
            >
              { playerState.isFullScreen ? (
                  <FaCompress size={20}/>
                ) : (
                  <FaExpand size={20} />
              )}
            </button>
    )
}

export const ButtoFullScreen = memo(ButtoFullScreenElement)