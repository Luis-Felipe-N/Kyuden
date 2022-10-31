import { GetStaticProps } from "next"
import Image from "next/future/image"
import Link from "next/link"
import { FaPlay, FaPlus } from "react-icons/fa"
import { IAnimes } from "../../@types/Anime"
import { Button } from "../Button"
import { ButtonIcon } from "../ButtonIcon"
import { Skeleton } from "../Skeleton"

import style from './style.module.scss'

interface IHeroProps {
    anime: IAnimes
}


export function Hero({ anime }: IHeroProps) {

    const backgroundImage = `linear-gradient(1.68deg, rgba(23, 25, 35, 0.99) 20%, rgba(23, 25, 35, 0) 80%) ${anime.cover}`
    
    return (    
        <section 
            className={style.heroContainer} 
            style={{backgroundImage: `linear-gradient(0deg, rgba(23,25,35,1) 2%, rgba(23,25,35,0.9093838218881303) 17%, rgba(23,25,35,0.8393558106836485) 27%, rgba(23,25,35,0.6600841020001751) 40%, rgba(0,212,255,0) 99%), url(${anime.cover})`}}>
            {/* { anime?.youtubeVideoId && (
                <div className={style.trailer}>
                    <iframe 
                        // src={`https://www.youtube.com/embed/${anime.youtubeVideoId}?autoplay=1&controls=0`} 
                        src={`https://www.youtube.com/embed/${anime.youtubeVideoId}?autoplay=1&mute=1&controls=0playlist&version=3&loop=1&playlist=${anime.youtubeVideoId}`} 
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        >
                        
                    </iframe>
                </div>
            )} */}
            <div className={style.hero}>
                { anime && (
                    <>
                    <Image 
                        src={anime.post}
                        width={210}
                        height={315}
                        alt={`Foto da capa do anime ${anime.title}`}
                        title={`Foto da capa do anime ${anime.title}`}
                        priority
                    />
                    <div className={style.content}>
                        <h1>{anime.title}</h1>
                        <p>{anime.description}</p>
                        <div className={style.containerBtns}>
                            <ButtonIcon
                                title={`Adicionar ${anime.title} na minha lista`}
                                aria-label={`Adicionar ${anime.title} na minha lista`}
                                className={style.btnAddList}
                            >
                                <FaPlus />
                            </ButtonIcon>
                            <Button asChild>
                                <Link href={`/anime/${anime.slug}`}>
                                    <a>
                                        <FaPlay />
                                        Assistir
                                    </a>
                                </Link>
                            </Button>
                        </div>
                       
                    </div>
                    </>
                )}
            </div>
        </section>
    )
}
