import { createContext, ReactNode, RefObject, useEffect, useState } from "react";
import { IPlayerVideo } from "../@types/PlayerVideo";

interface IplayerVideoContext {
    playerState: IPlayerVideo,
    handleTogglePauseVideo: () => void;
    handleUpdatePercentage: (value: number) => void;
    handleUpdateSpeed: (value: number) => void;
    handleSetFullScreen: (state: boolean) => void;
}

interface IPlayerVideoProvider {
    children: ReactNode;
}

export const playerVideoContext = createContext({} as IplayerVideoContext)

export function PlayerVideoProvider({ children }: IPlayerVideoProvider) {
    const [playerState, setPlayerState] = useState<IPlayerVideo>({
        percentage: 0,
        durationTime: 0,
        speed: 1,
        isPlaying: false,
        isMuted: false,
        isFullScreen: false
    })

    function handleTogglePauseVideo() {
        setPlayerState({
            ...playerState,
            isPlaying: !playerState.isPlaying
        })
    }

    function handleUpdatePercentage(value: number) {
        setPlayerState({
            ...playerState,
            percentage: value
        })
    }

    function handleUpdateSpeed(value: number) {
        setPlayerState({
            ...playerState,
            speed: value
        })
    }

    function handleSetFullScreen(state: boolean) {
        setPlayerState({
            ...playerState,
            isFullScreen: state
        })
    }

    return (
        <playerVideoContext.Provider value={{playerState, handleTogglePauseVideo, handleUpdatePercentage, handleUpdateSpeed, handleSetFullScreen}}>
            {children}
        </playerVideoContext.Provider>
    )
}