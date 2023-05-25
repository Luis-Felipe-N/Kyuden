import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IAnimes, IEpisodesAnime } from "../../../@types/Anime";
import { useAuth } from "../../../hooks/useAuth";
import { useEpisode } from "../../../hooks/useEpisode";
import { convertMillisecondsInMinutes, convertSecondsInInMinute } from "../../utils/convertTime";
import { getUrlBaseVideo } from "../../utils/getUrlBaseVideo";
import { motion as m } from "framer-motion"
import style from './style.module.scss'
import axios, { CancelTokenSource } from "axios";

interface INextEpisodeProps {
    episode: IEpisodesAnime;
    anime?: IAnimes
}

export function EpisodeCardWatched({episode, anime}: INextEpisodeProps) {
    const [linkStream, setLinkStream] = useState('')
    const { user } = useAuth()

    const { getWatchedEpisodeData } = useEpisode()

    const episodeVideoRef = useRef<HTMLVideoElement>(null)
    const showTeaserTimeOut = useRef<typeof window.timeout>()
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
        clearTimeout(showTeaserTimeOut.current)

        showTeaserTimeOut.current = setTimeout(async () => {
            if (linkStream) return handleSetEpsiode()

            if (episode?.linkEmbed) {
                const data = await getUrlBaseVideo(episode.linkEmbed)
                if (data) {
                    setLinkStream(data[0].play_url)
                    handleSetEpsiode()
                }
            }
        }, 400)

    }

    function handleRemovePlayer() {
        setLinkStream('')
        clearTimeout(showTeaserTimeOut.current)
    }

    useEffect(() => {
        if (!episodeVideoRef.current) return

        episodeVideoRef.current.src = linkStream
        episodeVideoRef.current.currentTime = getWatchedEpisode?.assistedTime || 0
    }, [linkStream, getWatchedEpisode])
    
    return (
        <Link 
            onMouseEnter={handlePlayerEpisode} 
            onMouseLeave={handleRemovePlayer} 
            onBlur={handleRemovePlayer} 
            className={style.episode} 
            href={`/episodio/${episode.id}`}
        >
            <div className={style.episode__cover}>
                <div className={style.episode__cover_play}>
                    <FaPlay />
                </div>

                { linkStream ? (
                    <m.video  layout 
                    initial={{opacity: 0}} 
                    animate={{opacity: 1}} 
                    exit={{opacity: 0, scale: 0.9}}  ref={episodeVideoRef} controls={false} autoPlay loop>
                    </m.video>
                ) : (
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

            </div>
            <div className={style.episode__infos}>
                <strong>{episode.title}</strong>
                <span>{episode.duration > 0 && convertMillisecondsInMinutes(episode.duration)}</span>
            </div>
        </Link>
    )
}