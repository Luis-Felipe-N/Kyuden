import style from './style.module.scss'
import { IAnimes } from "../../@types/Anime";
import { CardAnime } from "../CardAnime";
import { useEffect, useState } from 'react';
import { api } from '../../service/api';

interface ICarouselAnimes {
    genre: string
}

export function CarouselAnimes({ genre }: ICarouselAnimes) {
  const [ animes, setAnimes ] = useState<IAnimes[]>()

  useEffect(() => {
    const getAnimesRow = async () => {
      const { data } = await api.get(`animes/genre/${genre}`)

      setAnimes(data.animes)
    }

    getAnimesRow()
  }, [])

  return (
    <section className={style.row}>
      <div className={style.carouselContainer}>
        <h1>{genre}</h1>
          <div className={style.carousel}>
            { animes && animes.map(anime => (
              <CardAnime key={anime.slug} anime={anime} />
            ))}
          </div>
        </div>
    </section>
  );
}