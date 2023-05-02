import React from 'react';
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
import { useQuery } from 'react-query';
import Image from 'next/image';
import { Navigation } from 'swiper';

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

export function ModalEditProfile() {
    const [open, setOpen] = React.useState(false);
    const [avatarSelected, setAvatarSelected] = React.useState(0);
    const [bannerSelected, setBannerSelected] = React.useState("");

    const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(editProfileFormSchema)
    });

    function handleSelectAvatar(url: string, id: number) {
        setValue("avatar", url)
        setAvatarSelected(id)
    }

    function handleSelectBanner(url: string) {
        setValue("banner", url)
    }

    const { isLoading: animeMediaSuggestionIsLoading, error: animeMediaSuggestionIsError, data: animeMediaSuggestion } = useQuery({
        queryKey: ['animeMediaSuggestion'],
        queryFn: () =>
        fetch('https://kitsu.io/api/edge/anime').then(
            (res): Promise<IAnimeKitsu> => res.json(),
        ),
    })

    const { isLoading: avatarSuggestionIsLoading, error: avatarSuggestionIsLoadingIsError, data: avatarSuggestion } = useQuery({
        queryKey: ['avatarSuggestion'],
        queryFn: () =>
        fetch('https://api.jikan.moe/v4/characters').then(
            (res): Promise<ICharactersJikanAPI> => res.json(),
        ),
    })

    console.log(animeMediaSuggestion)

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
            <button className="Button violet">Edit profile</button>
            </Dialog.Trigger>
            <Dialog.Portal className={style.modal}>
                <Dialog.Overlay className={style.modal__overlay} />
                <Dialog.Content className={style.modal__content}>
                    <Dialog.Title className={style.modal__content_title}>Editar perfil</Dialog.Title>
                    <Dialog.Description className={style.modal__content_description}>
                        Faça alterações no seu perfil aqui. Clique em salvar quando terminar..
                    </Dialog.Description>

                    <div>
                        <div className={style.modal__suggestion}>
                            <strong>Sugestão de avatares</strong>
                            <div className={style.modal__suggestion_avatar}>
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
                                { avatarSuggestion && avatarSuggestion.data.map(anime => (
                                        <SwiperSlide key={anime.mal_id}>
                                            <div className={
                                                `${anime.images.jpg.image_url == user?.avatar ? style.modal__suggestion_avatar_active : ''}
                                                 ${ avatarSelected == anime.mal_id ? style.modal__suggestion_avatar_selected : ''}
                                                `}>
                                            <Image
                                                src={anime.images.jpg.image_url}
                                                width={200}
                                                height={200}
                                                objectFit="cover"
                                                objectPosition="top"
                                                alt={`Poster do personagem ${anime.name}`}
                                                title={`Poster do personagem ${anime.name}`}
                                                onClick={() => handleSelectAvatar(anime.images.jpg.image_url, anime.mal_id)}
                                            />
                                            </div>
                                        </SwiperSlide>
                                ))}
                                </Swiper>
                            </div>

                            <strong>Sugestão de banners</strong>
                            <div className={style.modal__suggestion_banner}>
                                <Swiper
                                    breakpoints={{
                                        550: {
                                        width: 550,
                                        slidesPerView: 1,
                                        },

                                        1100: {
                                        width: 1100,
                                        slidesPerView: 2  ,
                                        },
                                        1650: {
                                        width: 1650,
                                        slidesPerView: 3,
                                        },
                                    }}
                                    modules={[Navigation]}
                                    className={style.carousel}
                                >
                                { animeMediaSuggestion && animeMediaSuggestion.data.filter(anime => !!anime.attributes.coverImage?.original).map(anime => (
                                        <SwiperSlide key={anime.attributes.slug}>
                                            <Image
                                                src={anime.attributes.coverImage.original}
                                                width={500}
                                                height={281}
                                                objectFit="cover"
                                                alt={`Poster do anime ${anime.attributes.canonicalTitle}`}
                                                title={`Poster do anime ${anime.attributes.canonicalTitle}`}
                                                onClick={() => handleSelectBanner(anime.attributes.coverImage.original)}
                                            />
                                        </SwiperSlide>
                                ))}
                                </Swiper>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className={style.modal__content_fieldset}>
                                <label className="Label" htmlFor="avatar">
                                    Avatar
                                </label>
                                <div>
                                {user && user.avatar ? (
                                    <Avatar
                                    style={{width: "10rem", height: "10rem", lineHeight: "10rem", fontSize: "4rem"}}
                                    className={style.modal__avatar} src={user?.avatar} fallback={user.displayName[0]} />
                                ) : (
                                    <div>
                                        <Avatar
                                            style={{width: "10rem", height: "10rem", lineHeight: "10rem", fontSize: "4rem"}}
                                            className={style.modal__avatar} fallback={user?.displayName[0]} />

                                    </div>
                                )}
                                </div>
                                <input {...register("avatar")} id="avatar" defaultValue={user?.avatar || ''} />
                            </fieldset>
                            <fieldset className={style.modal__content_fieldset}>
                                <label className="Label" htmlFor="banner">
                                    Banner
                                </label>
                                {/* <div className={style.modal__content_preview}>
                                    Arraste
                                </div> */}
                                <input {...register("banner")} id="banner" defaultValue={user?.banner || ''} />
                            </fieldset>
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
