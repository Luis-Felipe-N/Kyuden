import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaShare } from "react-icons/fa"
import { FiDownload } from "react-icons/fi"
import { IAnimes, IEpisodesAnime } from "../../@types/Anime"
import { Button } from "../../components/Button"
import { ButtonIcon } from "../../components/ButtonIcon"
import { Comments } from "../../components/Comments"
import { EpisodeCard } from "../../components/EpisodeCard"
import { Skeleton } from "../../components/Skeleton"
import { getUrlBaseVideo } from "../../components/utils/getUrlBaseVideo"
import { useEpisode } from "../../hooks/useEpisode"
import { api } from "../../service/api"

import style from "../../styles/Episode.module.scss"
import { IStreamsBlogger } from "../../types"

interface IEpisodeProps {
    episode: IEpisodesAnime,
    remainingEpisodes: IEpisodesAnime[],
    anime: IAnimes
}

export default function Episodio({ episode, remainingEpisodes, anime }: IEpisodeProps) {
    const [streams, setStreams] = useState<IStreamsBlogger[]>()
    const [nextEpisode, setNextEpisode] = useState<IEpisodesAnime | undefined>()

    const { getNextEpisode } = useEpisode()

    function formatDate(date: Date) {
        const dateFormated = new Date(date).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })

        return dateFormated
    }

    useEffect(() => {
        const getUrlBase = async () => {
            if (episode?.linkEmbed) {
                const data = await getUrlBaseVideo(episode.linkEmbed)
                setStreams(data)
            }
        }

        getUrlBase()
    }, [episode?.linkEmbed])

    useEffect(() => {
        if (episode && remainingEpisodes) {
            setNextEpisode(getNextEpisode(remainingEpisodes, episode))
            console.log(getNextEpisode(remainingEpisodes, episode))
        }
    }, [episode, remainingEpisodes])

    return (
        <>
        <Head>
            { anime && (
                <title>Kyuden :: {episode.title} do {anime.title}</title>
            )} 
        </Head>
        <main className={`${style.episode} container`}>
            { episode ? (
                <>
                    <section className={style.episode__epvideo}>
                        
                        { streams ? (
                            <video controls autoPlay>
                                <source src={streams[streams.length - 1].play_url} type="video/mp4" /> 
                                HTML5 Video .
                                <a style={{width: '200px'}} href={streams[streams.length - 1].play_url} download>Download video</a> . 
                            </video>
                        ) : (
                            <div className={style.episode__iframe}>
                                <iframe src={episode.linkEmbed} frameBorder="0"></iframe>
                            </div>
                        )}

                        <div className={style.episode__info}>
                           <div className={style.episode__info_ep}>
                                <h3>{episode.title}</h3>
                                <Link href={`/anime/${anime.slug}`}>
                                    <div className={style.episode__info_anime}>
                                        <Image
                                            src={anime.post}
                                            width={50}
                                            height={50}
                                            alt={`Poster do anime ${anime.title}`}
                                        />
                                        <div>
                                            <h4>{anime.title}</h4>
                                            <span>{anime.rating} pontos de avaliação</span>
                                        </div>
                                    </div>
                                </Link>
                                <span>Lançado em {formatDate(episode.uploaded_at)}</span>
                           </div>

                           <div className={style.episode__info_options}>
                            {
                                streams && (
                                    <Button
                                        title="Baixar episódio"
                                        aria-label="Baixar episódio"
                                        asChild
                                    >
                                        <a href={streams[streams.length - 1].play_url} download>
                                            <FiDownload size={20} />
                                            Baixar
                                        </a>
                                    </Button>
                                )
                            }
                                <Button
                                    title="Compartilhar episódio"
                                    aria-label="Compartilhar episódio"
                                >
                                    <FaShare size={20} />
                                    Compartilha
                                </Button>
                           </div>
                        </div>

                    </section>
                    <Comments />
                    <aside className={style.episode__remainingEpisodes}>
                        { nextEpisode && (
                            <>
                            <h3>Próximo episódio</h3>
                            <EpisodeCard episode={nextEpisode} />
                            </>
                        )}
                        {/* <ul>
                            { remainingEpisodes.map(remainingEpisode => (
                                <li key={remainingEpisode.id} >
                                    <Link href={`/episodio/${nextEpisode.id}`}>
                                        <a>
                                            <img
                                                loading="lazy"
                                                src={remainingEpisode.image}
                                                width={350}
                                                height={175}
                                                alt={`Imagem do episódio ${remainingEpisode.title}`}
                                                title={`Imagem do episódio ${remainingEpisode.title}`}
                                            />

                                            <strong>{remainingEpisode.title}</strong>
                                        </a>                                
                                    </Link>
                                </li>
                            )) }
                        </ul> */}
                    </aside>
                </>
            ) : (
                <>
                    <section className={style.episode__epvideo}>
                        <Skeleton width={1000} height={500} />

                        <Skeleton width={1000} height={100} />
                    </section>
                    <section>
                        <Skeleton width={1000} height={500} />
                    </section>
                    <aside className={style.episode__remainingEpisodes}>
                    <Skeleton height={1000}  />
                    </aside>
                </>
            )}
        </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const id = params?.id
    try {
        console.log(id)
        const { data } = await api.get(`/animes/episode/${id}`)

        return {
            props: {
                ...data
            },
            revalidate: 60
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
    
}