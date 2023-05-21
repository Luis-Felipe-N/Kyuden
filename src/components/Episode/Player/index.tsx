import { useRouter } from "next/router";
import { forwardRef, ReactNode, useCallback, useEffect, useRef } from "react";
import { IEpisodesAnime } from "../../../@types/Anime"
import { VideoProvider } from "../../../context/VideoContext";
import { useAuth } from "../../../hooks/useAuth";
import { useEpisode } from "../../../hooks/useEpisode";
import { updateUserData } from "../../../service/firebase";
import { arrangeAndAddObject } from "../../../utils/object";
import { getUrlBaseVideo } from "../../utils/getUrlBaseVideo";
import { Controls } from "./Controls";
import { LoadingPlayer } from "./LoadingPlayer";

import style from './style.module.scss'


interface IPlayerProps {
    episode: IEpisodesAnime;
}

interface IInnerPlayerProps  {
    children: ReactNode;
    episode: IEpisodesAnime;
    className: string;
}

const InnerPlayer = forwardRef<HTMLVideoElement, IInnerPlayerProps>(({children, episode, ...props}, ref) => {
    const playerRef = useRef<HTMLVideoElement>(null)
    const containerPlayerRef = useRef<HTMLDivElement>(null)

    const { user } = useAuth()
    const router   = useRouter()

    const { getWatchedEpisodeData } = useEpisode()

    const watchedEpisodeData = user && episode ? getWatchedEpisodeData(user, episode) : null;

    const savePreviosTime = useCallback(() => {
        if (playerRef.current !== null) {
            if (user) {
                updateUserData(user.uid, {
                    watchingEpisodes: arrangeAndAddObject(user.watchingEpisodes || {}, {
                        id: episode.id,
                        assistedTime: playerRef.current.currentTime,
                        updatedAt: ''
                    }, episode.id)
                })
            }
        }
    }, [playerRef, episode, user])

    useEffect(() => {    
        router.events.on("routeChangeStart", savePreviosTime);
    
        return () => {
          router.events.off("routeChangeStart", savePreviosTime);
        };
      }, [router.events, savePreviosTime]);

    useEffect(() => {
        const getUrlBase = async () => {
            if (episode.linkEmbed && playerRef.current) {
                const data = await getUrlBaseVideo(episode.linkEmbed)
                if (data) {
                    playerRef.current.src = data[data.length - 1].play_url

                    if (watchedEpisodeData) {
                        playerRef.current.currentTime = watchedEpisodeData.assistedTime
                    } else {
                        playerRef.current.currentTime = 0
                    }
                }
            }
        }

        getUrlBase()
    }, [episode.linkEmbed, watchedEpisodeData])

    return (
        <VideoProvider episode={episode} videoRef={playerRef} containerPlayerRef={containerPlayerRef}>
            <div ref={containerPlayerRef} className={style.player}>
                <video autoPlay ref={playerRef} {...props}></video>
                {children}
            </div>
        </VideoProvider>
    )
})

InnerPlayer.displayName = "InnerPlayer"

export function Player({ episode }: IPlayerProps) {   

    return (
        <InnerPlayer episode={episode} className={style.videoPlayer}>
            <Controls />
            <LoadingPlayer />
        </InnerPlayer>
    )
}