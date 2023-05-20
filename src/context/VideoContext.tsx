import { createContext, ReactNode, RefObject, useCallback, useEffect, useState } from "react";

export interface IPlayerVideo {
  isPlaying: boolean;
  isMuted: boolean;
  percentage: number;
  durationTime: number;
  speed: number;
  isFullScreen: boolean
}


interface IVideoContext {
  videoEl: HTMLVideoElement | undefined;
  playerState: IPlayerVideo
}

interface IVideoProviderProps {
  children: ReactNode;
  videoRef: RefObject<HTMLVideoElement>;
}

export interface IPlayerVideo {
  isPlaying: boolean;
  isMuted: boolean;
  percentage: number;
  durationTime: number;
  volume: number;
  currentTime: number;
  speed: number;
  isFullScreen: boolean
}

export const VideoContext = createContext({} as IVideoContext)

export function VideoProvider({ children, videoRef }: IVideoProviderProps) {
  const [videoEl, setVideoEl] = useState<HTMLVideoElement>()
  const [playerState, setPlayerState] = useState<IPlayerVideo>({
      percentage: 0,
      durationTime: 0,
      currentTime: 0,
      volume: 0,
      speed: 1,
      isPlaying: false,
      isMuted: false,
      isFullScreen: false
  })

  const updateState = useCallback((state: Partial<IPlayerVideo>) => {

    setPlayerState((prev) => ({...prev, ...state}))

  }, [])

  useEffect(() => {
    if (!videoRef.current) return

    setVideoEl(videoRef.current)
  }, [videoRef])

  useEffect(() => {
    if (!videoEl) return

    const handlePlay = () => {
      updateState({
        isPlaying: true
      });
    };

    const handlePause = () => {
      updateState({
        isPlaying: false
      });
    };

    const handleTimeUpdate = () => {
      updateState({
        percentage: (videoEl.currentTime / videoEl.duration) * 100,
        durationTime: videoEl.duration,
        currentTime: videoEl.currentTime
      });
    };

    const handleVolumeChange = () => {
      updateState({
        volume: videoEl.volume
      });
    };

    videoEl.addEventListener("play", handlePlay)
    videoEl.addEventListener("pause", handlePause)
    videoEl.addEventListener("timeupdate", handleTimeUpdate)
    videoEl.addEventListener("volumechange", handleVolumeChange)

    return () => {
      videoEl.removeEventListener("play", handlePlay)   
      videoEl.removeEventListener("pause", handlePause)
      videoEl.removeEventListener("timeupdate", handleTimeUpdate)
      videoEl.removeEventListener("volumechange", handleVolumeChange)
    }

  }, [videoEl, updateState])

  return (<VideoContext.Provider value={{ videoEl, playerState }}>
    {children}
</VideoContext.Provider>)
}