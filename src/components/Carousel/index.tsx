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
}

export function CarouselAnimes({ genre }: ICarouselAnimes) {
  const containerCarouselRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, error } = useQuery(`animes${genre}`, async () => {
    const { data } = await api.get(`animes/genre/${genre}?take=10`)
    return data.animes
  })

  function createRangeArrayByNumber(number: number) {
    return [...Array(number).keys()]
  }

  if (!data || !data.length) return null

  return (
    <section className={style.row}>

    <div className={`${style.headerCarousel} container`}>
      <h2>{genre}</h2>
    </div>
    
    
      <div ref={containerCarouselRef} className={`${style.carouselContainer} container `}>
        <Swiper
          breakpoints={{
            235: {
              width: 235,
              slidesPerView: 1,
            },

            490: {
              width: 490,
              slidesPerView: 2  ,
            },
            700: {
              width: 700,
              slidesPerView: 3,
            },
          }}
          modules={[Navigation]}
          className={style.carousel}
        >
          { isLoading ? (
              <SwiperSlide>
                <Skeleton width={210} height={305}/>
                { createRangeArrayByNumber(10).map(item => (
                  <Skeleton key={item} width={210} height={305} />
                ))}
              </SwiperSlide>
          ) : (
            data.map((anime: IAnimes) => (
              <SwiperSlide key={anime.slug}>
                <CardAnime anime={anime} />
              </SwiperSlide>
            ))
          )}
          
        </Swiper>
      </div>
  </section>
  );  
}
