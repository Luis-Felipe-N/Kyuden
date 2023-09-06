import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { IEpisodesAnime } from '../@types/Anime'

export interface IPlayerVideo {
  isPlaying: boolean
  isMuted: boolean
  percentage: number
  durationTime: number
  volume: number
  currentTime: number
  speed: number
  isFullScreen: boolean
  isLoading: boolean
  isFinished: boolean
}

interface IVideoContext {
  videoEl: HTMLVideoElement | undefined
  playerState: IPlayerVideo
  containerPlayerEl: HTMLDivElement | undefined
  handleFullScreenChange: (value: boolean) => void
  episode: IEpisodesAnime
}

interface IVideoProviderProps {
  children: ReactNode
  episode: IEpisodesAnime
  videoRef: RefObject<HTMLVideoElement>
  containerPlayerRef: RefObject<HTMLDivElement>
}

export const VideoContext = createContext({} as IVideoContext)

export function VideoProvider({
  children,
  videoRef,
  episode,
  containerPlayerRef,
}: IVideoProviderProps) {
  const [videoEl, setVideoEl] = useState<HTMLVideoElement>()
  const [containerPlayerEl, setCcontainerPlayerEl] = useState<HTMLDivElement>()
  const [playerState, setPlayerState] = useState<IPlayerVideo>({
    percentage: 0,
    durationTime: 0,
    currentTime: 0,
    volume: 1,
    speed: 1,
    isPlaying: false,
    isMuted: false,
    isFullScreen: false,
    isLoading: true,
    isFinished: false,
  })

  const updateState = useCallback((state: Partial<IPlayerVideo>) => {
    setPlayerState((prev) => ({ ...prev, ...state }))
  }, [])

  const handleFullScreenChange = (value: boolean) => {
    updateState({
      isFullScreen: value,
    })
  }

  useEffect(() => {
    if (!videoRef.current) return

    setVideoEl(videoRef.current)
  }, [videoRef])

  useEffect(() => {
    if (!containerPlayerRef.current) return

    setCcontainerPlayerEl(containerPlayerRef.current)
  }, [containerPlayerRef])

  useEffect(() => {
    if (!videoEl) return

    const handlePlay = () => {
      updateState({
        isPlaying: true,
        isFinished: false,
        // isLoading: false
      })
    }

    const handlePause = () => {
      updateState({
        isPlaying: false,
        isFinished: false,
        // isLoading: false
      })
    }

    const handleTimeUpdate = () => {
      updateState({
        percentage: (videoEl.currentTime / videoEl.duration) * 100,
        durationTime: videoEl.duration,
        currentTime: videoEl.currentTime,
        isLoading: false,
      })
    }

    const handleVolumeChange = () => {
      updateState({
        volume: videoEl.volume,
      })
    }

    const handleLoadedData = () => {
      updateState({
        isLoading: false,
      })
    }

    const handleWaiting = () => {
      updateState({
        isLoading: true,
      })
    }

    const handleEnded = () => {
      updateState({
        isPlaying: false,
        isFinished: true,
      })
    }

    videoEl.addEventListener('play', handlePlay)
    videoEl.addEventListener('pause', handlePause)
    videoEl.addEventListener('timeupdate', handleTimeUpdate)
    videoEl.addEventListener('volumechange', handleVolumeChange)
    videoEl.addEventListener('loadeddata', handleLoadedData)
    videoEl.addEventListener('waiting', handleWaiting)
    videoEl.addEventListener('ended', handleEnded)

    return () => {
      videoEl.removeEventListener('play', handlePlay)
      videoEl.removeEventListener('pause', handlePause)
      videoEl.removeEventListener('timeupdate', handleTimeUpdate)
      videoEl.removeEventListener('volumechange', handleVolumeChange)
      videoEl.removeEventListener('loadeddata', handleLoadedData)
      videoEl.removeEventListener('waiting', handleWaiting)
      videoEl.removeEventListener('ended', handleEnded)
    }
  }, [videoEl, updateState])

  return (
    <VideoContext.Provider
      value={{
        videoEl,
        playerState,
        containerPlayerEl,
        handleFullScreenChange,
        episode,
      }}
    >
      {children}
    </VideoContext.Provider>
  )
}
