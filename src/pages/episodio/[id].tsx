import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
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
        <main className={`${style.episode} container`}>
            { episode && (
                <>
                    <section>
                        <div>
                            <iframe  width={1000} height={562.5} src={episode.linkEmbed} frameBorder="0"></iframe>
                        </div>

                        <div>
                            { anime.slug && (
                                <Link href={`/anime/${anime.slug}`}>
                                <a>
                                    <Image
                                        width={64}
                                        height={64}
                                        src={anime.post} 
                                        alt="" />
                                    <h1>{anime.title}</h1>
                                </a>
                            </Link>
                            )}
                        </div>

                    </section>
                    <aside className={style.episode__remainingEpisodes}>
                        <h3>Próximos episódios</h3>
                        <ul>
                            { remainingEpisodes.map(remainingEpisode => (
                                <li key={remainingEpisode.id} className={remainingEpisode.id == episode.id ? style.episode__remainingEpisodes_active : ""}>
                                    <Link href={`/episodio/${remainingEpisode.id}`}>
                                        <a>
                                            <Image
                                                src={remainingEpisode.image}
                                                width={350}
                                                height={175}
                                                alt={`Imagem do episódo ${remainingEpisode.title}`}
                                                title={`Imagem do episódo ${remainingEpisode.title}`}
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