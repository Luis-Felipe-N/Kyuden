import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { FaShare } from "react-icons/fa"
import { FiDownload } from "react-icons/fi"
import { IAnimes, IEpisodesAnime } from "../../@types/Anime"
import { ButtonIcon } from "../../components/ButtonIcon"
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

    const { getNextEpisode } = useEpisode()

    // useEffect(() => {
    //     const getUrlBase = async () => {
    //         if (episode?.linkEmbed) {
    //             const data = await getUrlBaseVideo(episode.linkEmbed)
    //             setStreams(data)
    //         }
    //     }

    //     getUrlBase()
    // }, [episode?.linkEmbed])

    return (
        <>
        <Head>
            { anime && (
                <title>Kyuden :: {anime.title}</title>
            )}
        </Head>
        <main className={`${style.episode} container`}>
            { episode && (
                <>
                    <section className={style.episode__epvideo}>
                        
                        { streams ? (
                            <video src={streams[streams.length - 1].play_url} controls autoPlay></video>
                        ) : (
                            <div className={style.episode__iframe}>
                                <iframe src={episode.linkEmbed} frameBorder="0"></iframe>
                            </div>
                        )}

                        <div className={style.episode__info}>
                           <div className={style.episode__info_ep}>
                                <h3>{episode.title} </h3>
                                <span>Lançado em 6 out 2022</span>
                           </div>

                           <div className={style.episode__info_options}>
                                <ButtonIcon
                                    title="Baixar episódio"
                                    aria-label="Baixar episódio"
                                >
                                    <FiDownload size={20} />
                                </ButtonIcon>
                                <ButtonIcon
                                    title="Compartilhar episódio"
                                    aria-label="Compartilhar episódio"
                                >
                                    <FaShare size={20} />
                                </ButtonIcon>
                           </div>
                        </div>

                    </section>
                    <section className={style.episode__comments}>
                        <strong>Comentarios</strong>
                    </section>
                    <aside className={style.episode__remainingEpisodes}>
                        <h3>Próximos episódios</h3>
                        <ul>
                            { remainingEpisodes.map(remainingEpisode => (
                                <li key={remainingEpisode.id} >
                                    <Link href={`/episodio/${remainingEpisode.id}`}>
                                        <a className={remainingEpisode.id == episode.id ? style.episode__remainingEpisodes_active : ""}>
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
                        </ul>
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