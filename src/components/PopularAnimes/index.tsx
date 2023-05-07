import { IAnimes } from "../../@types/Anime"
import { CardPopularAnime } from "./CardPopularAnime"
import style from "./style.module.scss"
import { Navigation } from "swiper";
import { SwiperSlide, Swiper} from "swiper/react";

interface IPopularAnimesProps {
    animes: IAnimes[]
}

export function PopularAnimes({ animes }: IPopularAnimesProps) {
    console.log(animes)
    return (
        <section className={style.popularAnimesContainer}>
            <Swiper 
                slidesPerView="auto"
                spaceBetween={15}
                modules={[Navigation]}
                className={style.popularAnime}
                >
                { animes && animes.map((anime, index) => (
                <div 
                    className={style.content} 
                    key={anime.slug}
                >
                    <SwiperSlide>
                        <CardPopularAnime anime={anime}  />
                    </SwiperSlide>
                </div>)) }
            </Swiper>
        </section>
    )
}