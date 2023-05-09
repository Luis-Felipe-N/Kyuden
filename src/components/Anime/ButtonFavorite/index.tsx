import { FaHeart } from "react-icons/fa"
import { toast } from "react-toastify"
import { IAnimes } from "../../../@types/Anime"
import { useAnime } from "../../../hooks/useAnime"
import { useAuth } from "../../../hooks/useAuth"
import { updateUserData } from "../../../service/firebase"
import { arrangeAndAddAttributes } from "../../../utils/object"
import style from './style.module.scss'

interface IButtonFavoriteProps {
    anime: IAnimes;
    hasText?: boolean;
}

export function ButtonFavorite({anime, hasText = false}: IButtonFavoriteProps) {
    const { user } = useAuth()
    const { checkAnimeIsFavorite } = useAnime()

    const animeIsFavorite = user?.myListAnimes ? checkAnimeIsFavorite(anime.slug, user?.myListAnimes) : false

    if (!animeIsFavorite || !user) return (
        <>
            <button
                className={style.buttonFavorite}
                aria-label={`Adicionar o anime ${anime.title} aos seus favoritos`}
                title={`Adicionar o anime ${anime.title} aos seus favoritos`}
                onClick={handleAddFavoriteAnime}
             >
                <FaHeart size={17} />
            </button>
            { hasText && <strong>Favoritar</strong>}
        </>
    )

    function handleAddFavoriteAnime() {
        if (!!user) {
            updateUserData(user.uid, {
                myListAnimes: arrangeAndAddAttributes(user.myListAnimes, anime.slug)
            }).then(res => {
                toast.success(`Anime adicionado aos seus favoritos`)
            })
        } else {
            toast.warn(`Faça login para adicionar este anime aos seus favoritos.`)
        }
    }

    return (
        <>
            <button
                className={`${style.buttonFavorite} ${style.buttonFavorite__favorite}`}
                aria-label={`Remover o anime ${anime.title} dos seus favoritos`}
                title={`Remover o anime ${anime.title} dos seus favoritos`}
            >
                <FaHeart size={17} />
            </button>
            { hasText && <strong>Remover dos Favoritos</strong>}
        </>
    )
}