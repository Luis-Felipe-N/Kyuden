import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from "react-icons/io"

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import style from './style.module.scss'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import { updateUserData } from '../../service/firebase';
import { useAuth } from '../../hooks/useAuth';
import { removeEmptyAttribute } from '../../utils/Object';
import { Avatar } from '../Avatar';
import { useInfiniteQuery, useQuery } from 'react-query';
import Image from 'next/image';
import { Navigation } from 'swiper';
import { useState } from 'react';
import { spawn } from 'child_process';

interface ICharactersJikanAPI {
    data: {
        mal_id: number,
        url: string,
        images: {
            jpg: {
            image_url: string
            },
        },
        name: string,
        name_kanji: string,
        nicknames: string[],
        favorites: number,
        about: string
    }[]
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
  

const editProfileFormSchema = yup.object().shape({
    displayName: yup.string(),
    avatar: yup.string(),
    banner: yup.string()
});

const AVATARPERVIEW = 9
const BANNERPERVIEW = 3

export function ModalEditProfile() {
    const [open, setOpen] = useState(false);
    const [avatarSelected, setAvatarSelected] = useState(0);
    const [bannerSelected, setBannerSelected] = useState("");

    const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(editProfileFormSchema)
    });

    function handleFetchDataAvatar(page: number) {
        return fetch('https://api.jikan.moe/v4/characters?page=' + (page || 1)).then((res): Promise<ICharactersJikanAPI>  => res.json()).then(res => res.data)
    }

    function handleFetchDataBanner(page: number) {
        return fetch('https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=' + (page * 10 + 1)).then((res): Promise<IAnimeKitsu>  => res.json()).then(res => res.data)
    }

    const { isLoading: avatarSuggestionIsLoading, error: avatarSuggestionIsLoadingIsError, data: avatarSuggestion, fetchNextPage: fetchNextPageAvatar } = useInfiniteQuery({
        queryKey: ["avatarSuggestion"],
        queryFn: ({pageParam}) => handleFetchDataAvatar(pageParam),
        getNextPageParam: (lastPage, pages) => pages.length + 1,
    })

    const { isLoading: bannerSuggestionIsLoading, error: bannerSuggestionIsError, data: bannerSuggestion, fetchNextPage: fetchNextPageBanner } = useInfiniteQuery({
        queryKey: ['bannerSuggestion'],
        queryFn: ({pageParam}) => handleFetchDataBanner(pageParam),
        getNextPageParam: (lastPage, pages) => pages.length + 1,
    })

    function handleSelectAvatar(url: string, id: number) {
        setValue("avatar", url)
        setAvatarSelected(id)
    }

    function handleSelectBanner(url: string) {
        setValue("banner", url)
    }

    function handleGetNextPageAvatar(currentIndex: number, totalIndex: number) {
        if (totalIndex - (AVATARPERVIEW + 5) < currentIndex) {
            fetchNextPageAvatar()
        }
    }

    function handleGetNextPageBanner(currentIndex: number, totalIndex: number) {
        console.log(totalIndex, BANNERPERVIEW,  currentIndex)
        if (totalIndex - (BANNERPERVIEW + 5) < currentIndex) {
            fetchNextPageBanner()
        }
    }
    

    console.log("DATA: ", bannerSuggestion)

    const { user } = useAuth()

    const onSubmit = (data: any) => handleUpdateProfile(data)
    
    function handleUpdateProfile(data: any) {
        if (user) {
            updateUserData(user.uid, removeEmptyAttribute(data)).then(() => {
                setOpen(false)
            })
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
            <button className="Button violet">Editar perfil</button>
            </Dialog.Trigger>
            <Dialog.Portal className={style.modal}>
                <Dialog.Overlay className={style.modal__overlay} />
                <Dialog.Content className={style.modal__content}>
                    <Dialog.Title className={style.modal__content_title}>Editar perfil</Dialog.Title>
                    <Dialog.Description className={style.modal__content_description}>
                        Faça alterações no seu perfil aqui. Clique em salvar quando terminar..
                    </Dialog.Description>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className={style.modal__content_fieldset}>
                                <label className="Label" htmlFor="displayName">
                                    Nome
                                </label>
                                <input {...register("displayName")} className="Input" id="displayName" defaultValue={user?.displayName} />
                            </fieldset>

                            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                <Button type="submit" className={style.modal__btnsave}>Salvar</Button>
                            </div>
                        </form>
                        <div className={style.modal__suggestion}>
                            <strong>Avatares</strong>
                            <div className={style.modal__suggestion_avatar}>
                                <Swiper
                                    onSlideChange={(e) => handleGetNextPageAvatar(e.realIndex, avatarSuggestion ? avatarSuggestion.pages.length * 25 : 0)}
                                    freeMode={true}
                                    slidesPerView={9}
                                    spaceBetween={10}
                                    modules={[Navigation]}
                                    className={style.carousel}
                                >
                                    {user?.avatar && (
                                        <SwiperSlide>
                                            <div>
                                                <Image
                                                    className={style.modal__suggestion_avatar_active}
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
                                    )}

                                { avatarSuggestion && avatarSuggestion.pages.map(page => page && (page.map(anime => (
                                    <SwiperSlide key={anime.mal_id}>
                                        <div className={avatarSelected == anime.mal_id ? style.modal__suggestion_avatar_selected : ''}>
                                            <Image
                                                quality={100}
                                                src={anime.images.jpg.image_url}
                                                width={100}
                                                height={100}
                                                loading="lazy"
                                                objectFit="cover"
                                                objectPosition="top"
                                                alt={`Poster do personagem ${anime.name}`}
                                                title={`Poster do personagem ${anime.name}`}
                                                onClick={() => handleSelectAvatar(anime.images.jpg.image_url, anime.mal_id)}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))))}
                                </Swiper>
                            </div>

                            <strong>Banners</strong>
                            <div className={style.modal__suggestion_banner}>
                                <Swiper
                                    onSlideChange={(e) => handleGetNextPageBanner(e.realIndex, avatarSuggestion ? avatarSuggestion.pages.length * 10 : 0)}
                                    freeMode={true}
                                    slidesPerView={3}
                                    spaceBetween={10}
                                    modules={[Navigation]}
                                    className={style.carousel}
                                >
                                {user?.banner && (
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
                                )}
                                { bannerSuggestion && bannerSuggestion.pages.map(page => page && (page.map(anime => !!anime.attributes.coverImage?.original && (
                                    <SwiperSlide key={anime.attributes.slug}>
                                        <Image
                                            quality={50}
                                            blurDataURL='./background.png'
                                            src={anime.attributes.coverImage.original}
                                            width={500}
                                            height={281}
                                            objectFit="cover"
                                            alt={`Poster do anime ${anime.attributes.canonicalTitle}`}
                                            title={`Poster do anime ${anime.attributes.canonicalTitle}`}
                                            onClick={() => handleSelectBanner(anime.attributes.coverImage.original)}
                                        />
                                    </SwiperSlide>
                                ))))}

                                { avatarSuggestionIsLoading && <span>carregando mais</span>}
                                </Swiper>
                            </div>
                        </div>
                       
                    </div>
                    <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <IoMdClose />
                    </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )

}
