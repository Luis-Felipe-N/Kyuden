import { FaHeart } from "react-icons/fa"
import { toast } from "react-toastify"
import { IAnimes } from "../../../@types/Anime"
import { useAnime } from "../../../hooks/useAnime"
import { useAuth } from "../../../hooks/useAuth"
import { updateUserData } from "../../../service/firebase"
import { arrangeAndAddAttributes } from "../../../utils/object"
import style from './style.module.scss'

interface IButtonFavoriteProps {
    anime: IAnimes
}

export function ButtonFavorite({anime}: IButtonFavoriteProps) {
    const { user } = useAuth()
    const { checkAnimeIsFavorite } = useAnime()

    const animeIsFavorite = user?.myListAnimes ? checkAnimeIsFavorite(anime.slug, user?.myListAnimes) : false

    if (!animeIsFavorite || !user) return (
        <>
            <button
                className={style.buttonFavorite}
                aria-label={`Adicionar o anime ${anime.title} aos favoritos`}
                title={`Adicionar o anime ${anime.title} aos favoritos`}
                onClick={handleAddFavoriteAnime}
             >
                <FaHeart size={17} />
            </button>
            <strong>Favoritar</strong>
        </>
    )

    function handleAddFavoriteAnime() {
        if (!!user) {
            updateUserData(user.uid, {
                myListAnimes: arrangeAndAddAttributes(user.myListAnimes, anime.slug)
            }).then(res => {
                toast.success(`Anime adicionado aos favoritos`)
            })
        }
    }

    return (
        <>
            <button
                className={`${style.buttonFavorite} ${style.buttonFavorite__favorite}`}
                aria-label={`Adicionar o anime ${anime.title} aos favoritos`}
                title={`Adicionar o anime ${anime.title} aos favoritos`}
            >
                <FaHeart size={17} />
            </button>
            <strong>Remover dos Favoritos</strong>
        </>
    )
}