import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
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
import { useRouter } from "next/router"
import { updateUserData } from "../../service/firebase"
import { useAuth } from "../../hooks/useAuth"
import { arrangeAndAddObject } from "../../utils/Object"
import { number } from "yup"

interface IEpisodeProps {
    episode: IEpisodesAnime,
    remainingEpisodes: IEpisodesAnime[],
    anime: IAnimes
}

interface IWatchedEpisodeData {
    id: string;
    assistedTime: string;
}

export default function Episodio({ episode, remainingEpisodes, anime }: IEpisodeProps) {
    const [streams, setStreams] = useState<IStreamsBlogger[]>()
    const [nextEpisode, setNextEpisode] = useState<IEpisodesAnime | undefined>()

    const refVideo = useRef<HTMLVideoElement>(null)

    const router = useRouter()
    const { user } = useAuth()

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
        }

        if (user?.watchingEpisodes) {
            // @ts-ignore
            const watchedEpisode = Object.entries(user.watchingEpisodes).find(([, value]: any) => value.id === episode.id)

            // @ts-ignore
            const watchedEpisodeData: IWatchedEpisodeData = watchedEpisode ? watchedEpisode[1] : {}
            
            if (refVideo.current && watchedEpisodeData.assistedTime) {
                refVideo.current.currentTime = Number(watchedEpisodeData.assistedTime)
            }
        }
    }, [episode, remainingEpisodes, refVideo, user])

    useEffect(() => {
        const exitingFunction = () => {
            if (refVideo.current !== null) {
                if (user) {
                    updateUserData(user.uid, {
                        watchingEpisodes: arrangeAndAddObject(user.watchingEpisodes || {}, {
                            id: episode.id,
                            assistedTime: refVideo.current.currentTime
                        }, episode.id)
                    })
                }
            }
        };
    
        router.events.on("routeChangeStart", exitingFunction);
    
        return () => {
          router.events.off("routeChangeStart", exitingFunction);
        };
      }, [router.events]);

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
                            <video ref={refVideo} controls autoPlay>
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
                                        <a href={streams[streams.length - 1].play_url} download={episode.title}>
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
