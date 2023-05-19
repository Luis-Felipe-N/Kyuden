import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { IEpisodesAnime } from "../../../@types/Anime"
import { useAuth } from "../../../hooks/useAuth";
import { useEpisode } from "../../../hooks/useEpisode";
import { updateUserData } from "../../../service/firebase";
import { arrangeAndAddObject } from "../../../utils/object";
import { getUrlBaseVideo } from "../../utils/getUrlBaseVideo";

import style from './style.module.scss'
import { PlayerVideo } from "../PlayerVideo";

interface IPlayerProps {
    episode: IEpisodesAnime;
}

export function Player({ episode }: IPlayerProps) {

    const playerRef = useRef<HTMLVideoElement>(null)

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
                    console.log(data)
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
        <PlayerVideo url="https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4" />
        // <video ref={playerRef} controls autoPlay className={`${style.player} ${style.player__loading}`}>
        // </video>
        // { streams ? (
        // ) : (
        //     <div className={style.episode__iframe}>
        //         <iframe src={episode.linkEmbed} frameBorder="0"></iframe>
        //     </div>
        // )}
    )
}