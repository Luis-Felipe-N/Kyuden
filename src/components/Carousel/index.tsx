import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import { IAnimes } from "../../@types/Anime";
import { CardAnime } from "../CardAnime";

interface ICarouselAnimes {
    animes: IAnimes[]
}

export function CarouselAnimes({ animes }: ICarouselAnimes) {
  return (
    <>
    <h1>fsfdfhdhdnbdb</h1>
      <Swiper
        slidesPerView={7}
        spaceBetween={5}
        slidesPerGroup={7}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >

        { animes.map(anime => (
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
    </>
  );
}
