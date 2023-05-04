import Image from "next/future/image";
import Link from "next/link";
import { useMemo } from "react";
import { FaPlay } from "react-icons/fa";
import { useQuery } from "react-query";
import { IAnimes, IEpisodesAnime } from "../../@types/Anime";
import { IUser } from "../../@types/User";
import { useAuth } from "../../hooks/useAuth";
import { useEpisode } from "../../hooks/useEpisode";
import { getUserData } from "../../service/firebase";
import { Skeleton } from "../Skeleton";
import { convertMillisecondsInMinutes } from "../utils/convertTime";
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

export function EpisodeCard({episode, anime}: INextEpisodeProps) {

    const { user } = useAuth()

    const { isLoading: userDataLoading, error: userDataError, data: userDataData } = useQuery({
        queryKey: ['userDataData'],
        queryFn: async (): Promise<IUser | null> => {
            return getUserData(user?.uid || null)
        },
    })
    
    const { getWatchedEpisodeData } = useEpisode()

    const assistedTimeInPercentage = useMemo(() => {
        if (!userDataData) return null

        const watchedEpisodeData = getWatchedEpisodeData(userDataData, episode)

        if (!watchedEpisodeData) return null

        return (Number(watchedEpisodeData.assistedTime) * 100) / episode.duration
    }, [episode, userDataData, getWatchedEpisodeData])

    console.log(assistedTimeInPercentage)
    
    return (
        <Link href={`/episodio/${episode.id}`}>
            <a className={style.episode}>
                <div className={style.episode__cover}>
                    <div className={style.episode__cover_play}>
                        <FaPlay />
                    </div>
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
                    { assistedTimeInPercentage && <div className={style.slideAssistedTime}><span style={{width: `${assistedTimeInPercentage}%`}}></span></div>}
                </div>
                <div className={style.episode__infos}>
                    <strong>{episode.title}</strong>
                    <span>{episode.duration > 0 && convertMillisecondsInMinutes(episode.duration)}</span>
                </div>
                
            </a>
        </Link>
    )
}