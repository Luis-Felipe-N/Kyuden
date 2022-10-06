import Image from "next/image"
import { useEffect, useState } from "react"
import { IAnimes } from "../../@types/Anime"
import { api } from "../../service/api"
import style from './style.module.scss'

export function Hero() {
    const [ anime, setAnime ] = useState<IAnimes>()

    useEffect(() => {
        const getAnime = async () => {
            const { data } = await api.get('/animes/love-lab')
            console.log(data)
            setAnime(data.anime)
        }

        getAnime()
    }, [])

    return (    
        <section className={style.heroContainer} style={{backgroundImage: `linear-gradient(1.68deg, #171923 6%, rgba(23, 25, 35, 0) 90.54%), url(${anime?.cover}) `}}>
            <div className={style.hero}>
                { anime ? (
                    <>
                    <Image 
                        src={anime.post}
                        width={210}
                        height={315}
                        alt={`Foto da capa do anime ${anime.title}`}
                        title={`Foto da capa do anime ${anime.title}`}
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