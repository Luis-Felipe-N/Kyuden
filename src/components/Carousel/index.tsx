import style from './style.module.scss'
import { IAnimes } from "../../@types/Anime";
import { CardAnime } from "../CardAnime";
import { api } from '../../service/api';

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

interface ICarouselAnimes {
    genre: string
}

export function CarouselAnimes({ genre }: ICarouselAnimes) {
  const [ animes, setAnimes ] = useState<IAnimes[]>()
  const containerCarouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getAnimesRow = async () => {
      const { data } = await api.get(`animes/genre/${genre}`)
      setAnimes(data.animes)
    }

    getAnimesRow()
  }, [genre])

  if (animes?.length) {
    return (
      <section className={style.row}>
  
      <div className={`${style.headerCarousel} container`}>
        <h2>{genre}</h2>
      </div>
      
      
        <div ref={containerCarouselRef} className={`${style.carouselContainer} container `}>
          <Swiper
            slidesPerView={(containerCarouselRef.current?.clientWidth || 1400) / 235}
            modules={[Navigation]}
            className={style.carousel}
          >
            { animes && animes.map(anime => (
              <SwiperSlide key={anime.slug}>
                <CardAnime anime={anime} />
              </SwiperSlide>
              
            ))}
            
          </Swiper>
        </div>
    </section>
    );
  } else {
    return null
  }

  
}
