import { useCallback, useRef, useState } from "react";
import { Controls } from "./Controls";
import style from './style.module.scss'
import { isMobile } from "../../../utils/checkDevice";
import { usePlayerVideo } from "../../../hooks/usePlayerVideo";
import screenfull from "../../../utils/screenFull";
import { PlaybackRate } from "./PlaybackRate";

interface IPlayerVideoProps {
    url: string
}


export function PlayerVideo({ url }: IPlayerVideoProps) {
    const [showControls, setShowControls] = useState(false)

    const videoPlayerRef = useRef<HTMLVideoElement>(null)
    const containerVideoPlayerRef = useRef<HTMLDivElement>(null)

    const { 
      isPlaying, 
      isFullScreen, 
      percentage, 
      speed, 
      handleTogglePauseVideo, 
      handleChangePercentage, 
      handlechangeSpeed, 
      handleSetFullScreen, 
      handleTimeUpdate,
      handleChangeVolume
    } = usePlayerVideo(videoPlayerRef.current)

    // @ts-ignore
    let hiddenControlsSetInterval = useRef<typeof window.settimeout>();

    const handleToggleFullscreen = useCallback(() => {
        if (!screenfull.isEnabled) return;

        if (!isFullScreen && containerVideoPlayerRef.current) {
          screenfull.request(containerVideoPlayerRef.current).then(() => {
            console.log(isMobile())
            if (!isMobile()) return;
    
            screen.orientation.lock('landscape');
          });
          handleSetFullScreen(true);
        } else {
          screenfull.exit().then(() => {
            if (!isMobile()) return;
    
            screen.orientation.lock('portrait');
          });
          handleSetFullScreen(false);
        }
    }, [isFullScreen,handleSetFullScreen]);

    const handleShowControls = useCallback(() => {
      clearTimeout(hiddenControlsSetInterval.current)
      setShowControls(true)

      handleHiddenControls()
    }, [])

    const handleHiddenControls = useCallback(() => {
      hiddenControlsSetInterval.current = setTimeout(() => {
        setShowControls(false)
      }, 4000) // 2s
    }, [hiddenControlsSetInterval])

    return (
        <div 
          ref={containerVideoPlayerRef} 
          className={style.player} 
          onDoubleClick={handleToggleFullscreen}
          onMouseEnter={handleShowControls}
          onMouseOut={handleHiddenControls}
          onMouseMove={handleShowControls}
        >  
            <video
                ref={videoPlayerRef}
                className={style.videoPlayer}
                onClick={handleTogglePauseVideo}
                onTimeUpdate={handleTimeUpdate}
                autoPlay
                >
                    <source src={url}  />
            </video>
  
            <div className={showControls ? `${style.containerControls} ${style.showControls}` : style.containerControls} >
                <PlaybackRate currentSpeed={speed} onChangePlaybackRate={handlechangeSpeed} />
                <Controls 
                    onChangeVolume={handleChangeVolume}
                    onRequestFullScreen={handleToggleFullscreen}
                    onTogglePauseVideo={handleTogglePauseVideo}
                    onChangePercentage={handleChangePercentage}
                    isPlaying={isPlaying}
                    percentage={percentage}
                    duration={videoPlayerRef.current?.duration || 0}
                    currentTime={videoPlayerRef.current?.currentTime || 0}
                />
            </div>
        </div>

    )
}