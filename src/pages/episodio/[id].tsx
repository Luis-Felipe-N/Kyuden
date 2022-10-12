import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Link from "next/link"
import { useEffect } from "react"
import { IEpisodesAnime } from "../../@types/Anime"
import { getUrlBaseVideo } from "../../components/utils/getUrlBaseVideo"
import { api } from "../../service/api"

import style from "../../styles/Episode.module.scss"

interface IEpisodeProps {
    episode: IEpisodesAnime,
    remainingEpisodes: IEpisodesAnime[]
}

export default function Episodio({ episode, remainingEpisodes }: IEpisodeProps) {


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
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const id = params?.id
    try {
        console.log(id)
        const { data } = await api.get(`/animes/episode/${id}`)

        const episode: IEpisodesAnime = data.episode
        const remainingEpisodes: IEpisodesAnime[] = data.remainingEpisodes

        return {
            props: {
                episode,
                remainingEpisodes
            },
            revalidate: 60
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
    
}