import { GetStaticPaths, GetStaticProps } from "next"
import { FaHeart, FaPlay, FaStar } from "react-icons/fa"
import { IAnimes, IEpisodesAnime } from "../../@types/Anime"
import { api } from "../../service/api"
import style from '../../styles/Anime.module.scss'
import Image from "next/future/image"
import { SelectSeason } from "../../components/SelectSeason"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ButtonIcon } from "../../components/ButtonIcon"
import Head from "next/head"
import { EpisodeCard } from "../../components/EpisodeCard"
import { useAuth } from "../../hooks/useAuth"
import { updateUserData } from "../../service/firebase"
import { arrangeAndAddAttributes } from "../../utils/Object"
import { useQuery } from "react-query"

interface IAnimePageProps {
    anime: IAnimes,
    firstSeason: string
}

export default function Anime({anime, firstSeason}: IAnimePageProps) {
    console.log('Rederizou')
    const [currentSeason, setCurrentSeason] = useState<string | null>(null)

    const { user } = useAuth()

    function getNextSeasonAnimes(season: string | null): Promise<IEpisodesAnime[]> | undefined {
        if (!season) return undefined

        return api.get(`/animes/season/${currentSeason}/episodes`).then(res => res.data.episodes)
    }

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
      } = useQuery({
        queryKey: ['episodes', currentSeason],
        queryFn: () => getNextSeasonAnimes(currentSeason),
        keepPreviousData : true
      })

    function handleChangeSeason(value: string) {
        setCurrentSeason(value)
    }

    function handleAddFavoriteAnime() {
        if (!!user) {
            updateUserData(user.uid, {
                myListAnimes: arrangeAndAddAttributes(user.myListAnimes, anime.slug)
            })
        } else {

        }
    }

    useEffect(() => {
        setCurrentSeason(firstSeason)
    }, [firstSeason])

    return (
        <>
            {anime && (
                <Head>
                    <title>
                        Kyuden :: {anime.title}
                    </title>
                    
                    <meta name="description" content={anime.description} />
                </Head>
            )}
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
                                    { anime.youtubeVideoId && (
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
                                    )}

                                    <div>
                                        <button
                                            className={style.heroAnime__btns_button}
                                            aria-label={`Adicionar o anime ${anime.title} aos favoritos`}
                                            title={`Adicionar o anime ${anime.title} aos favoritos`}
                                            onClick={handleAddFavoriteAnime}
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
                                { !!data ? (
                                    data.map(episode => (
                                        <EpisodeCard key={episode.id} episode={episode} anime={anime} />
                                    ))
                                ) : (
                                    "Buscando episódios"
                                )}
                            </div>
                        </section>
                    </>
                )}

            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async ({ }) => {
    const { data } = await api.get(`/animes/`)

    const animes = data.animes.map((anime: IAnimes) => {
        return {
            params: {
                slug: anime.slug
            }
        }
    })

    return {
        paths: animes,
        fallback: true
    }
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
            revalidate: 60
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
    
}