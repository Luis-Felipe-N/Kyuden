import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import style from './style.module.scss'

import { useInfiniteQuery } from 'react-query';
import Image from 'next/image';
import { Navigation } from 'swiper';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { ImCheckboxChecked } from "react-icons/im";

interface IBannerSliderProps {
    onSelectBanner: (url: string) => void
}

interface IAnimeKitsu {
    data: {
      attributes: {
        slug: string
        titles: {
          en: string
          en_jp: string
          ja_jp: string
        },
        coverImage: {
            original: string
        }
        canonicalTitle: string
        abbreviatedTitles: string
        startDate: string
        endDate: string
        popularityRank: number
        ageRating: "G" | "PG" | "R" | "R18"
        status: "current" | "finished" | "tba" | "unreleased" | "upcoming"
        posterImage: {
          original: string
        }
        episodeLength: number
        episodeCount: number
        youtubeVideoId: string
        showType: "ONA" | "OVA" | "TV" | "movie" | "music" | "special"
        nsfw: boolean
      }
    }[]
  }

const BANNERPERVIEW = 3

export function BannerSlider({ onSelectBanner }: IBannerSliderProps) {
    const { user } = useAuth()
    const [bannerSelected, setBannerSelected] = useState("");

    function handleSelectBanner(url: string, id: string) {
        onSelectBanner(url)
        setBannerSelected(id)
    }

    function handleFetchDataBanner(page: number) {
        return fetch('https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=' + (page * 10 + 1)).then((res): Promise<IAnimeKitsu>  => res.json()).then(res => res.data)
    }

    const { isLoading: bannerSuggestionIsLoading, error: bannerSuggestionIsError, data: bannerSuggestion, fetchNextPage: fetchNextPageBanner } = useInfiniteQuery({
        queryKey: ['bannerSuggestion'],
        queryFn: ({pageParam}) => handleFetchDataBanner(pageParam),
        getNextPageParam: (lastPage, pages) => pages.length + 1,
    })

    function handleGetNextPageBanner(currentIndex: number, totalIndex: number) {
        console.log(totalIndex, BANNERPERVIEW,  currentIndex)
        console.log(totalIndex - (BANNERPERVIEW + 4),  currentIndex)

        if (totalIndex - (BANNERPERVIEW + 4) < currentIndex * BANNERPERVIEW) {
            console.log("fazendo fetch")
            fetchNextPageBanner()
        }
    }

    console.log(bannerSuggestion)

    return (
        <>
             <Swiper
                onSlideChange={(e) => handleGetNextPageBanner(e.realIndex, bannerSuggestion ? bannerSuggestion.pages.length * 10 : 0)}
                freeMode={true}
                slidesPerView={3}
                spaceBetween={10}
                modules={[Navigation]}
                className={style.bannerSlider}
            >
            {/* {user?.banner && (
                    <SwiperSlide>
                    <Image
                        src={user.banner}
                        width={500}
                        height={281}
                        objectFit="cover"
                        alt={`Banner do usuário ${user.displayName}`}
                        title={`Banner do usuário ${user.displayName}`}
                    />
                </SwiperSlide>
            )} */}
            { bannerSuggestion && bannerSuggestion.pages.map(page => page && (page.map(anime => !!anime.attributes.coverImage?.original && (
                <SwiperSlide key={anime.attributes.slug}>
                    <div className={`${style.bannerSlider__item} ${bannerSelected == anime.attributes.slug ? style.bannerSlider__item_selected : ''}`}>
                        <Image
                            quality={50}
                            blurDataURL='./background.png'
                            src={anime.attributes.coverImage.original}
                            width={500}
                            height={281}
                            objectFit="cover"
                            alt={`Poster do anime ${anime.attributes.canonicalTitle}`}
                            title={`Poster do anime ${anime.attributes.canonicalTitle}`}
                            onClick={() => handleSelectBanner(anime.attributes.coverImage.original, anime.attributes.slug)}
                        />
                         { bannerSelected == anime.attributes.slug && (<ImCheckboxChecked size={20}/>)}
                    </div>
                </SwiperSlide>
            ))))}

            { bannerSuggestionIsLoading && <span>carregando mais</span>}
            </Swiper>
        </>
    )
}