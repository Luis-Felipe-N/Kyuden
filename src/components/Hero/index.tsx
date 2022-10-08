import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { FaPlay } from "react-icons/fa"
import { IAnimes } from "../../@types/Anime"

import style from './style.module.scss'

interface IHeroProps {
    anime: IAnimes
}

export function Hero({ anime }: IHeroProps) {

    const backgroundImage = !anime.youtubeVideoId ? `url(${anime.cover || 'banner.png'})` : ''
    console.log(backgroundImage)
    return (    
        <section 
            className={style.heroContainer} 
            style={{
                backgroundImage: `linear-gradient(1.68deg, rgba(23, 25, 35, 0.99) 20%, rgba(23, 25, 35, 0) 80%) ${backgroundImage}`
                }}>
            { anime?.youtubeVideoId && (
                <div className={style.trailer}>
                    <iframe 
                        // src={`https://www.youtube.com/embed/${anime.youtubeVideoId}?autoplay=1&controls=0`} 
                        src={`https://www.youtube.com/embed/${anime.youtubeVideoId}?autoplay=1&mute=1&enablejsapi=1&controls=0&loop=1`} 
                        frameBorder="0"
                        >
                        
                    </iframe>
                </div>
            )}
            <div className={style.hero}>
                { anime ? (
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
                        <Link href={anime.slug}>
                            <a>
                                <FaPlay />
                                Assistir
                            </a>
                        </Link>
                    </div>
                    </>
                ) : (
                    "carregando"
                )}
            </div>
        </section>
    )
}
