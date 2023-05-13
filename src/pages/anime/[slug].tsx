import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from "next"
import { FaPlay, FaStar } from "react-icons/fa"

import { ButtonIcon } from "../../components/ButtonIcon"

import { api } from "../../service/api"
import { IAnimes } from "../../@types/Anime"
import style from '../../styles/Anime.module.scss'
import { ButtonFavorite } from "../../components/Anime/ButtonFavorite"
import { Season } from "../../components/Anime/Season"

interface IAnimePageProps {
    anime: IAnimes,
    firstSeason: string
}

export default function Anime({anime, firstSeason}: IAnimePageProps) {

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
                            style={{backgroundImage: `linear-gradient(0deg, rgb(23, 25, 35) 0%, rgba(23, 25, 35, 0.91) 8%, rgba(23, 25, 35, 0.84) 18%, rgba(23, 25, 35, 0.66) 26%, rgba(0, 212, 255, 0) 61%), url(${anime?.cover || './banner.png'})`}}
                        >
                        
                            <div className="container">
                                <h1>{anime.title}</h1>
                                <p className={style.heroAnime__description}>{anime.description}</p>
                                <div className={style.heroAnime__infos}>
                                    <i className={style.heroAnime__infos_rating}>
                                        <FaStar />
                                        {anime.rating}/10
                                    </i>
                                    
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
                                                aschild="true"
                                            >
                                                <a target="__black" href={`https://www.youtube.com/watch?v=${anime.youtubeVideoId}`}>
                                                    <FaPlay size={17} />
                                                </a>
                                            </ButtonIcon>
                                            <strong>Trailer</strong>
                                        </div>  
                                    )}

                                    <div>
                                        <ButtonFavorite anime={anime}/>
                                    </div>
                                    
                                </div>
                            </div>
                        </section>
                        <section className={`${style.season} container`}>
                            <Season anime={anime} firstSeason={firstSeason} />
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