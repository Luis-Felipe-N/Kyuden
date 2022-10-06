import Image from "next/image"
import { useEffect, useState } from "react"
import { IAnimes } from "../../@types/Anime"
import { api } from "../../service/api"
import style from './style.module.scss'

export function Hero() {
    const [ anime, setAnime ] = useState<IAnimes>()

    useEffect(() => {
        const getAnime = async () => {
            const { data } = await api.get('/animes/taishou-otome-otogibanashi')
            console.log(data)
            setAnime(data.anime)
        }

        getAnime()
    }, [])

    return (    
        <section className={style.heroContainer} style={{backgroundImage: `linear-gradient(1.68deg, #171923 6%, rgba(23, 25, 35, 0) 90.54%), url(${anime?.cover || 'banner.png'}) `}}>
            {/* { anime?.youtubeVideoId && (
                <div className={style.trailer}>
                    <iframe src={`https://www.youtube.com/embed/${anime.youtubeVideoId}?&autoplay=1&playsinline=1&controls=0`} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        
                        ></iframe>
                </div>
            )} */}
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
                    </div>
                    </>
                ) : (
                    "carregando"
                )}
            </div>
        </section>
    )
}