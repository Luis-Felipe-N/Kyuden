import style from './style.module.scss'
import { IAnimes } from "../../@types/Anime";
import { CardAnime } from "../CardAnime";
import { api } from '../../service/api';

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

interface ICarouselAnimes {
    genre: string
}

export function CarouselAnimes({ genre }: ICarouselAnimes) {
  const [ animes, setAnimes ] = useState<IAnimes[]>()

  useEffect(() => {
    const getAnimesRow = async () => {
      const { data } = await api.get(`animes/`)

      setAnimes(data.animes)
    }

    getAnimesRow()
  }, [])

  return (
    <section className={style.row}>
      <div className={style.carouselContainer}>
        <h1>{genre}</h1>
          <Swiper
            slidesPerView={1400 / 220}
            spaceBetween={5}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[Navigation]}
            className="mySwiper"
            loop={true}
          >
            { animes && animes.map(anime => (
              <SwiperSlide key={anime.slug}>
                <CardAnime anime={anime} />
              </SwiperSlide>
              
            ))}
            
            {/* <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide> */}
          </Swiper>
        </div>
    </section>
  );
}



