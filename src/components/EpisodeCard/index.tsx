import Image from "next/future/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { IAnimes, IEpisodesAnime } from "../../@types/Anime";
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
                </div>
                <div className={style.episode__infos}>
                    <strong>{episode.title}</strong>
                    <span>{episode.duration > 0 && convertMillisecondsInMinutes(episode.duration)}</span>
                </div>
            </a>
        </Link>
    )
}