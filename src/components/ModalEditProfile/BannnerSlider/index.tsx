import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

import style from './style.module.scss'

import { useInfiniteQuery } from 'react-query'
import Image from 'next/image'
import { Navigation } from 'swiper'
import { useState } from 'react'
import { ImCheckboxChecked } from 'react-icons/im'
import { Skeleton } from '../../Skeleton'
import { createRangeArrayByNumber } from '../../../utils/array'

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
      }
      coverImage: {
        original: string
      }
      canonicalTitle: string
      abbreviatedTitles: string
      startDate: string
      endDate: string
      popularityRank: number
      ageRating: 'G' | 'PG' | 'R' | 'R18'
      status: 'current' | 'finished' | 'tba' | 'unreleased' | 'upcoming'
      posterImage: {
        original: string
      }
      episodeLength: number
      episodeCount: number
      youtubeVideoId: string
      showType: 'ONA' | 'OVA' | 'TV' | 'movie' | 'music' | 'special'
      nsfw: boolean
    }
  }[]
}

const BANNERPERVIEW = 3

export function BannerSlider({ onSelectBanner }: IBannerSliderProps) {
  const [bannerSelected, setBannerSelected] = useState('')

  function handleSelectBanner(url: string, id: string) {
    onSelectBanner(url)
    setBannerSelected(id)
  }

  function handleFetchDataBanner(page: number) {
    return fetch(
      'https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=' +
        (page * 10 + 1),
    )
      .then((res): Promise<IAnimeKitsu> => res.json())
      .then((res) => res.data)
  }

  const {
    isLoading,
    data: bannerSuggestion,
    fetchNextPage: fetchNextPageBanner,
  } = useInfiniteQuery({
    queryKey: ['bannerSuggestion'],
    queryFn: ({ pageParam }) => handleFetchDataBanner(pageParam),
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  })

  function handleGetNextPageBanner(currentIndex: number, totalIndex: number) {
    if (totalIndex - (BANNERPERVIEW + 4) < currentIndex * BANNERPERVIEW) {
      fetchNextPageBanner()
    }
  }

  if (isLoading)
    return (
      <>
        <Swiper
          freeMode={true}
          slidesPerView={2}
          spaceBetween={10}
          modules={[Navigation]}
          className={style.bannerSlider}
        >
          {createRangeArrayByNumber(4).map((item) => (
            <SwiperSlide key={item}>
              <Skeleton width={500} height={100} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )

  return (
    <>
      <Swiper
        onSlideChange={(e) =>
          handleGetNextPageBanner(
            e.realIndex,
            bannerSuggestion ? bannerSuggestion.pages.length * 10 : 0,
          )
        }
        freeMode={true}
        slidesPerView={3}
        spaceBetween={10}
        modules={[Navigation]}
        className={style.bannerSlider}
      >
        {bannerSuggestion &&
          bannerSuggestion.pages.map(
            (page) =>
              page &&
              page.map(
                (anime) =>
                  !!anime.attributes.coverImage?.original && (
                    <SwiperSlide key={anime.attributes.slug}>
                      <div
                        className={`${style.bannerSlider__item} ${
                          bannerSelected === anime.attributes.slug
                            ? style.bannerSlider__item_selected
                            : ''
                        }`}
                      >
                        <Image
                          quality={70}
                          blurDataURL="./background.png"
                          src={anime.attributes.coverImage.original}
                          width={250}
                          height={140.63}
                          alt={`Poster do anime ${anime.attributes.canonicalTitle}`}
                          title={`Poster do anime ${anime.attributes.canonicalTitle}`}
                          onClick={() =>
                            handleSelectBanner(
                              anime.attributes.coverImage.original,
                              anime.attributes.slug,
                            )
                          }
                        />
                        {bannerSelected === anime.attributes.slug && (
                          <ImCheckboxChecked size={20} />
                        )}
                      </div>
                    </SwiperSlide>
                  ),
              ),
          )}
      </Swiper>
    </>
  )
}
