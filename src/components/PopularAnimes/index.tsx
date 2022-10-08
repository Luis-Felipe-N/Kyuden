import { useEffect, useState } from "react"
import { IAnimes } from "../../@types/Anime"
import { api } from "../../service/api"
import { CardPopularAnime } from "./CardPopularAnime"
import style from "./style.module.scss"

interface IPopularAnimesProps {
    animes: IAnimes[]
}

export function PopularAnimes({ animes }: IPopularAnimesProps) {
    
    return (
        <section className={style.popularAnimesContainer}>
            <div className={style.popularAnime}>
                { animes && animes.map(anime => <CardPopularAnime anime={anime} key={anime.slug} />) }
            </div>
        </section>
    )
}