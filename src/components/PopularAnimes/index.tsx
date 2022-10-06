import { useEffect, useState } from "react"
import { IAnimes } from "../../@types/Anime"
import { api } from "../../service/api"
import { CardPopularAnime } from "./CardPopularAnime"
import style from "./style.module.scss"

export function PopularAnimes() {
    const [ animes, setAnimes ] = useState<IAnimes[]>()

    useEffect(() => {
        const getAnimePopular = async () => {
            const { data } = await api.get("/animes/popular")
            setAnimes(data.animes)
        }

        getAnimePopular()
    }, [])

    return (
        <section className={style.popularAnimesContainer}>
            <div className={style.popularAnime}>
                { animes && animes.map(anime => <CardPopularAnime anime={anime} key={anime.slug} />) }
            </div>
        </section>
    )
}