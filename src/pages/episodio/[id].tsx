import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Head from "next/head"
import Link from "next/link"
import { useEffect } from "react"
import { IAnimes, IEpisodesAnime } from "../../@types/Anime"
import { getUrlBaseVideo } from "../../components/utils/getUrlBaseVideo"
import { api } from "../../service/api"

import style from "../../styles/Episode.module.scss"
import Anime from "../anime/[slug]"

interface IEpisodeProps {
    episode: IEpisodesAnime,
    remainingEpisodes: IEpisodesAnime[],
    anime: IAnimes
}

export default function Episodio({ episode, remainingEpisodes, anime }: IEpisodeProps) {


    // useEffect(() => {
    //     const getUrlBase = async () => {
    //         if (episode?.linkEmbed) {
    //             await getUrlBaseVideo(episode.linkEmbed)
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
                    <section>
                        <div className={style.episode__iframe}>
                            <iframe src={episode.linkEmbed} frameBorder="0"></iframe>
                        </div>

                        <div>
                           <div></div>
                        </div>

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