import { GetStaticPaths, GetStaticProps } from "next"
import { FaHeart, FaPlay, FaStar } from "react-icons/fa"
import { IAnimes, IEpisodesAnime } from "../../@types/Anime"
import { api } from "../../service/api"
import style from '../../styles/Anime.module.scss'
import { SelectSeason } from "../../components/SelectSeason"
import { useEffect, useState } from "react"
import { ButtonIcon } from "../../components/ButtonIcon"
import Head from "next/head"
import { EpisodeCard } from "../../components/Episode/EpisodeCard"
import { useRouter } from "next/router"

interface IAnimePageProps {
    anime: IAnimes,
    firstSeason: string
}

export default function Anime({}: IAnimePageProps) {
    const router = useRouter()

    const genreSlug = router.asPath

    console.log(genreSlug)

    useEffect(() => {
        document.addEventListener('scroll', () => {
            
        })
    }, [])

    return (
        <>
            {/* {anime && (
                <Head>
                    <title>
                        Kyuden :: {anime.title}
                    </title>
                    <meta name="description" content={anime.description} />
                </Head>
            )} */}
            <main className={style.anime}>
                
            </main>
        </>
    )
}