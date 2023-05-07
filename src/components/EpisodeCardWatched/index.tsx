import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IAnimes, IEpisodesAnime } from "../../@types/Anime";
import { useAuth } from "../../hooks/useAuth";
import { useEpisode } from "../../hooks/useEpisode";
import { IStreamsBlogger } from "../../types";
import { Skeleton } from "../Skeleton";
import { convertMillisecondsInMinutes, convertSecondsInInMinute } from "../utils/convertTime";
import { getUrlBaseVideo } from "../utils/getUrlBaseVideo";
import style from './style.module.scss'

interface INextEpisodeProps {
    episode: IEpisodesAnime;
    anime?: IAnimes
}

function customLoadImage() {
    return (
        <Skeleton width={305} height={160} />
    )
}

export function EpisodeCardWatched({episode, anime}: INextEpisodeProps) {
    const [streams, setStreams] = useState<IStreamsBlogger[]>()
    const { user } = useAuth()
    const { getWatchedEpisodeData } = useEpisode()

    let linkStream: string;

    const episodeVideoRef = useRef<HTMLVideoElement>(null)

    const getWatchedEpisode = useMemo(() => {
        if (!user) return null

        const watchedEpisodeData = getWatchedEpisodeData(user, episode)

        if (!watchedEpisodeData) return null

        return watchedEpisodeData
    }, [episode, user, getWatchedEpisodeData])

    const assistedTimeInPercentage = (Number(getWatchedEpisode?.assistedTime) * 100) / episode.duration

    function handleSetEpsiode() {
        if (!episodeVideoRef?.current || !linkStream) return

        episodeVideoRef.current.src = linkStream
        episodeVideoRef.current.currentTime = getWatchedEpisode?.assistedTime || 0
    }

    async function handlePlayerEpisode() {
        console.log("setar video")
        if (linkStream) return handleSetEpsiode()

        if (episode?.linkEmbed) {
            const data = await getUrlBaseVideo(episode.linkEmbed)
            if (data) {
                linkStream = data[0].play_url
                handleSetEpsiode()
            }
        }
    }

    function handleRemovePlayer() {
        console.log(getWatchedEpisode)
        if (!episodeVideoRef.current) return

        episodeVideoRef.current.src = ''
    }
    
    return (
        <Link onMouseEnter={handlePlayerEpisode} onMouseLeave={handleRemovePlayer} className={style.episode} href={`/episodio/${episode.id}`}>
                <div className={style.episode__cover}>
                    <div className={style.episode__cover_play}>
                        <FaPlay />
                    </div>

                    { episode.image && (
                        <Image
                            src={episode.image}
                            width={305}
                            height={190}
                            placeholder="blur"
                            blurDataURL={episode.image}
                            unoptimized
                            alt={anime ? `Thumbnail do episode ${episode.title} do anime ${anime.title}` : `Thumbnail do episode ${episode.title}`}
                            title={anime ? `Thumbnail do episode ${episode.title} do anime ${anime.title}` : `Thumbnail do episode ${episode.title}`}
                        />
                    )}
                    { getWatchedEpisode !== null && (
                        <div className={style.slideAssistedTime}>
                            {convertSecondsInInMinute(getWatchedEpisode?.assistedTime)}
                            <div>
                                <span style={{width: `${assistedTimeInPercentage}%`}}></span>
                            </div>
                            {convertSecondsInInMinute(episode.duration)}
                        </div>
                    )}

                <video  ref={episodeVideoRef} controls={false} autoPlay loop>
                    <source />
                </video>
                </div>
                <div className={style.episode__infos}>
                    <strong>{episode.title}</strong>
                    <span>{episode.duration > 0 && convertMillisecondsInMinutes(episode.duration)}</span>
                </div>
               
        </Link>
    )
}