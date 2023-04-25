import { IAnimes } from "../../@types/Anime"
import { CardPopularAnime } from "./CardPopularAnime"
import style from "./style.module.scss"

import { motion as m } from "framer-motion";

interface IPopularAnimesProps {
    animes: IAnimes[]
}

export const container = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            delayChildren: .5,
            staggerChildren: .2,
        }
    }
}

export const item = {
    hidden: {
        y: "100%"
    },
    show: {
        y: "0%",
        transition: {
            duration: .5
        }
    }
}

export function PopularAnimes({ animes }: IPopularAnimesProps) {
    
    return (
        <m.section variants={container} className={style.popularAnimesContainer}>
            <div className={style.popularAnime}>
                { animes && animes.map((anime, index) => <m.div initial={{opacity: 0, y: `${index + 1 * 10}}%`}} 
                    animate={{opacity:1, y: "0%"}}
                    transition={{duration: 0.5, ease: "easeOut"}}
                    exit={{opacity: 1}} className={style.content} key={anime.slug}><CardPopularAnime anime={anime}  /></m.div>) }
            </div>
        </m.section>
    )
}