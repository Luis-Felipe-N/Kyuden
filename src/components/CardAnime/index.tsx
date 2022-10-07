import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { IAnimes } from "../../@types/Anime"
import style from './style.module.scss'

interface ICardAnimesProps {
    anime: IAnimes
}

export function CardAnime({ anime }: ICardAnimesProps) {

    return (
        <div className={style.cardAnime}>
            <Link href={`/anime/${anime.slug}`}>
            <Image
                src={anime.post}
                width={210}
                height={315}
                objectFit="cover"
                alt={`Poste do anime ${anime.title}`}
            />
            </Link>

            {/* <strong>{ anime.title }</strong>
            <span>{anime.rating}</span> */}
        </div>
    )
}