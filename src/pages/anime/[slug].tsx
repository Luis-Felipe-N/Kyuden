import { GetStaticPaths, GetStaticProps } from "next"
import { FaHeart, FaPlay, FaStar, FaStarHalfAlt } from "react-icons/fa"
import { BsFillBookmarkHeartFill } from 'react-icons/bs'
import { IAnimes, IEpisodesAnime, ISeasonsAnime } from "../../@types/Anime"
import { api } from "../../service/api"
import style from '../../styles/Anime.module.scss'
import Image from "next/future/image"
import { SelectSeason } from "../../components/SelectSeason"
import { useEffect, useState } from "react"
import Link from "next/link"
import { convertMillisecondsInMinutes } from "../../components/utils/convertTime"
import { ButtonIcon } from "../../components/ButtonIcon"

interface IAnimePageProps {
    anime: IAnimes,
    firstSeason: string
}

export default function Anime({anime, firstSeason}: IAnimePageProps) {
    const [currentSeason, setCurrentSeason] = useState(firstSeason)
    const [episodes, setEpisodes] = useState<IEpisodesAnime[]>()

    function handleChangeSeason(value: string) {
        console.log("chamado")
        setCurrentSeason(value)
    }

    useEffect(() => {
        console.log(currentSeason)
        const getEpisodes = async () => {
            try {
                const { data } = await api.get(`/animes/season/${currentSeason ? currentSeason : firstSeason}/episodes`)  
                setEpisodes(data.episodes)

            } catch (error) {
                console.log("Episodios não encontrado")
            }

        }

        getEpisodes()
    }, [currentSeason, firstSeason])

    return (
        <main className={style.anime}>
            { anime && (
                <>
                    <section
                        className={style.heroAnime}
                        style={{backgroundImage: `linear-gradient(0deg, rgba(23,25,35,1) 2%, rgba(23,25,35,0.9093838218881303) 17%, rgba(23,25,35,0.8393558106836485) 27%, rgba(23,25,35,0.6600841020001751) 40%, rgba(0,212,255,0) 99%), url(${anime?.cover || '/banner.png'})`}}
                    >
                       
                        <div className="container">
                            <h1>{anime.title}</h1>
                            <p className={style.heroAnime__description}>{anime.description}</p>
                            <div className={style.heroAnime__infos}>
                                <i className={style.heroAnime__infos_rating}>
                                    <FaStar />
                                    {anime.rating}/10
                                </i>
                                {/* <span>{anime.}</span> */}
                                <ul className={style.heroAnime__infos__genres}>
                                    {anime.genres.map(genre => (
                                        <li key={genre.slug}>{genre.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={style.heroAnime__btns}>
                                <div>
                                    <ButtonIcon
                                        className={style.heroAnime__btns_button}
                                        aria-label={`Assistir trailer do anime ${anime.title}`}
                                        title={`Assistir trailer do anime ${anime.title}`}
                                        asChild
                                    >
                                        <a target="__black" href={`https://www.youtube.com/watch?v=${anime.youtubeVideoId}`}>
                                            <FaPlay size={17} />
                                        </a>
                                    </ButtonIcon>
                                    <strong>Trailer</strong>
                                </div>

                                <div>
                                    <button
                                        className={style.heroAnime__btns_button}
                                        aria-label={`Adicionar o anime ${anime.title} aos favoritos`}
                                        title={`Adicionar o anime ${anime.title} aos favoritos`}
                                    >
                                        <FaHeart size={17} />
                                    </button>
                                    <strong>Favoritar</strong>
                                </div>
                                
                            </div>
                        </div>
                    </section>
                    <section className={`${style.season} container`}>
                        <div className={style.season__header}>
                            <SelectSeason seasons={anime.seasons}  onChangeSeason={handleChangeSeason}/>
                        </div>

                        <div className={style.season__episodes}>
                            { episodes ? (
                                episodes.map(episode => (
                                    <Link key={episode.id} href={`/episodio/${episode.id}`}>
                                        <a className={style.season__episodesCard}>
                                            <div className={style.season__episodesCard_cover}>
                                                <div className={style.season__episodesCard_play}>
                                                    <FaPlay />
                                                </div>
                                                <Image
                                                    src={episode.image}
                                                    width={305}
                                                    height={160}
                                                    alt={`Thumbnail do episode ${episode.title} do anime ${anime.title}`}
                                                    title={`Thumbnail do episode ${episode.title} do anime ${anime.title}`}
                                                    loading="lazy"
                                                />
                                            </div>
                                            <strong>{episode.title}</strong>
                                            <i>{episode.duration > 0 && convertMillisecondsInMinutes(episode.duration)}</i>
                                        </a>
                                    </Link>
                                ))
                            ) : (
                                "Buscando episódios"
                            )}
                        </div>
                    </section>
                </>
            )}

        </main>
    )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const slug = params?.slug
    try {
        const { data } = await api.get(`/animes/${slug}`)

        const anime: IAnimes = data.anime

        console.log(data.anime)

        return {
            props: {
                anime,
                firstSeason: anime.seasons[0].id
            },
            revalidate: 100
        }
    } catch (error) {

        console.log(error)
        return {
            notFound: true
        }
    }
    
}