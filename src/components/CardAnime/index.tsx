import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { IAnimes } from "../../@types/Anime"
import style from './style.module.scss'
import { motion as m } from "framer-motion"

interface ICardAnimesProps {
    anime: IAnimes
}

export function CardAnime({ anime }: ICardAnimesProps) {

    return (
        <m.div 
            layout 
            initial={{opacity: 0}} 
            animate={{opacity: 1}} 
            exit={{opacity: 0, scale: 0.9}} 
            
            className={style.cardAnime}
        >
            <Link href={`/anime/${anime.slug}`}>
                <a>
                    <img
                        src={anime.post}
                        width={210}
                        height={315}
                        alt={`Poste do anime ${anime.title}`}
                    />
                    <span>{ anime.title }</span>
                </a>
            </Link>
        </m.div>
    )
}