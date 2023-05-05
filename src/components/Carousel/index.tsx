import React, { useRef, useState } from "react";
import { Navigation } from "swiper";
import { useQuery } from 'react-query';
import { Skeleton } from "../Skeleton";
import { IAnimes } from "../../@types/Anime";
import { CardAnime } from "../CardAnime";
import { api } from '../../service/api';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import style from './style.module.scss'


interface ICarouselAnimes {
    genre: string
    animes: IAnimes[]
}

export function CarouselAnimes({ genre, animes }: ICarouselAnimes) {
  const containerCarouselRef = useRef<HTMLDivElement>(null)

  if (!animes) return null

  return (
    <section className={style.row}>

    <div className={`${style.headerCarousel} container`}>
      <h2>{genre}</h2>
    </div>
    
    
      <div ref={containerCarouselRef} className={`${style.carouselContainer} container `}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          modules={[Navigation]}
          className={style.carousel}
        >
          { 
            animes.map((anime: IAnimes) => (
              <SwiperSlide key={anime.slug}>
                <CardAnime anime={anime} />
              </SwiperSlide>
            ))
            }
          
        </Swiper>
      </div>
  </section>
  );  
}
