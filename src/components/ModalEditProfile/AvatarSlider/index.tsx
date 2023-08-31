import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

import { useInfiniteQuery } from 'react-query'
import { Navigation } from 'swiper'

import { ImCheckboxChecked } from 'react-icons/im'

import style from './style.module.scss'
import Image from 'next/image'

interface IAvatarSliderProps {
  onSelectAvatar: (url: string) => void
}

interface ICharactersJikanAPI {
  data: {
    mal_id: number
    url: string
    images: {
      jpg: {
        image_url: string
      }
    }
    name: string
    name_kanji: string
    nicknames: string[]
    favorites: number
    about: string
  }[]
}

const AVATARPERVIEW = 9

export function AvatarSlider({ onSelectAvatar }: IAvatarSliderProps) {
  const [avatarSelected, setAvatarSelected] = useState(0)

  function handleSelectAvatar(url: string, id: number) {
    onSelectAvatar(url)
    setAvatarSelected(id)
  }

  function handleFetchDataAvatar(page: number) {
    return fetch('https://api.jikan.moe/v4/characters?page=' + (page || 1))
      .then((res): Promise<ICharactersJikanAPI> => res.json())
      .then((res) => res.data)
  }

  function handleGetNextPageAvatar(currentIndex: number, totalIndex: number) {
    if (totalIndex - (AVATARPERVIEW + 5) < currentIndex) {
      fetchNextPageAvatar()
    }
  }

  const {
    data: avatarSuggestion,
    fetchNextPage: fetchNextPageAvatar,
  } = useInfiniteQuery({
    queryKey: ['avatarSuggestion'],
    queryFn: ({ pageParam }) => handleFetchDataAvatar(pageParam),
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  })

  return (
    <>
      <Swiper
        onSlideChange={(e) =>
          handleGetNextPageAvatar(
            e.realIndex,
            avatarSuggestion ? avatarSuggestion.pages.length * 25 : 0,
          )
        }
        freeMode={true}
        slidesPerView={7}
        spaceBetween={10}
        modules={[Navigation]}
        className={style.avatarSlider}
      >
        {/* {user?.avatar && (
                <SwiperSlide>
                    <div className={style.avatarSlider__item}>
                        <Image
                            src={user?.avatar}
                            width={100}
                            height={100}
                            objectFit="cover"
                            objectPosition="top"
                            alt={`Imagem de perfil do ${user.displayName}`}
                            title={`Imagem de perfil do ${user.displayName}`}
                        />
                    </div>
                </SwiperSlide>
            )} */}

        {avatarSuggestion &&
          avatarSuggestion.pages.map(
            (page) =>
              page &&
              page.map((anime) => (
                <SwiperSlide key={anime.mal_id}>
                  <div
                    className={`${style.avatarSlider__item} ${
                      avatarSelected === anime.mal_id
                        ? style.avatarSlider__item_selected
                        : ''
                    }`}
                  >
                    <Image
                      quality={10}
                      src={anime.images.jpg.image_url}
                      width={150}
                      height={150}
                      loading="lazy"
                      alt={`Poster do personagem ${anime.name}`}
                      title={`Poster do personagem ${anime.name}`}
                      onClick={() =>
                        handleSelectAvatar(
                          anime.images.jpg.image_url,
                          anime.mal_id,
                        )
                      }
                    />
                    {avatarSelected === anime.mal_id && (
                      <ImCheckboxChecked size={20} />
                    )}
                  </div>
                </SwiperSlide>
              )),
          )}
      </Swiper>
    </>
  )
}
