import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import { FaShare } from "react-icons/fa"
import { IAnimes, IEpisodesAnime } from "../../@types/Anime"
import { Button } from "../../components/Button"
import { Comments } from "../../components/Comments"
import { Skeleton } from "../../components/Skeleton"
import { api } from "../../service/api"

import style from "../../styles/Episode.module.scss"
import { NextEpisode } from "../../components/Episode/nextEpisode"
import { Player } from "../../components/Episode/Player"
import { formatDate } from "../../utils/date"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

interface IEpisodeProps {
    episode: IEpisodesAnime,
    remainingEpisodes: IEpisodesAnime[],
    anime: IAnimes
}

export default function Episodio({ episode, remainingEpisodes, anime }: IEpisodeProps) {

    const { asPath} = useRouter()

    function handleCopyLink() {
        const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${asPath}`;
        navigator.clipboard.writeText(origin + asPath)
        .then(res => toast.success('O link do episódio foi copiado para que você possa compartilhá-lo'))
        .catch(res => toast.error('Desculpe, nao foi possível compartilha o episódio'))
    }

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
                        
                        <Player episode={episode} />
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
                                <time>Lançado em {formatDate(episode.uploaded_at)}</time>
                           </div>

                           <div className={style.episode__info_options}>
                                <Button
                                    onClick={handleCopyLink}
                                    title="Compartilhar episódio"
                                    aria-label="Compartilhar episódio"
                                >
                                    <FaShare size={20} />
                                    Compartilha
                                </Button>
                           </div>
                        </div>

                    </section>
                    <Comments episode={episode} />
                    <aside className={style.episode__remainingEpisodes}>
                        <NextEpisode episode={episode} remainingEpisodes={remainingEpisodes} />
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
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const id = params?.id
    console.log(id)

    try {
        const { data } = await api.get(`/animes/episode/${id}`)
        console.log(data)
        return {
            props: {
                ...data
            },
            revalidate: 60
        }
    } catch (error) {
        console.log(error)
        return {
            notFound: true
        }
    }
    
}
