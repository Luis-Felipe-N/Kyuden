import Head from "next/head"
import { useQuery } from "react-query"
import { IAnimes, IEpisodesAnime } from "../@types/Anime"
import { Avatar } from "../components/Avatar"
import { CardAnime } from "../components/CardAnime"
import { ModalEditProfile } from "../components/ModalEditProfile"
import { Skeleton } from "../components/Skeleton"
import { useAuth } from "../hooks/useAuth"
import { api } from "../service/api"

import style from "../styles/Profile.module.scss"

export default function Perfil() {
    const { user } = useAuth()

    const myListAnimes = user?.myListAnimes ? Object.entries(user.myListAnimes).map(([,animeSlug]) => animeSlug) : []
    const watchedAnimes = user?.watchedAnimes ? Object.entries(user.watchedAnimes).map(([,episodeId]) => episodeId) : []

    function createRangeArrayByNumber(number: number) {
        return [...Array(number).keys()]
    }

    const { isLoading: myListAnimesLoading, error: myListAnimesError, data: myListAnimesData, isFetching: myListAnimesFetching } = useQuery({
        queryKey: ['myListAnimesData'],
        queryFn: async (): Promise<IAnimes[]> =>{
            const { data } = await api.post('animes/', {
                animesSlug: myListAnimes
            })
            
            return data.animes
        },
    })

    if (!user) return (
        <main className={style.profile}>
            <Head>
                <title>
                    Kyuden :: Perfil
                </title>
            </Head>
            <h1>NSem user</h1>
        </main>
    )

    return (
        <main className={style.profile}>
            { user && (
                <>
                <Head>
                    <title>
                        Kyuden :: {user.displayName}
                    </title>
                </Head>
                <section className={style.profile__banner} style={{backgroundImage: `linear-gradient(0deg, rgb(23, 25, 35) 0%, rgba(23, 25, 35, 0.91) 8%, rgba(23, 25, 35, 0.84) 18%, rgba(23, 25, 35, 0.66) 26%, rgba(0, 212, 255, 0) 61%), url(${user.banner})`}}>
                        <div className={style.profile__banner_container}>
                            <div>
                            <ModalEditProfile />
                            </div>

                            <div>
                                {user?.avatar ? (
                                    <Avatar hasBorder className={style.profile__banner_avatar} src={user?.avatar} fallback={user.displayName[0]} />
                                ) : (
                                    <Avatar className={style.profile__banner_avatar} fallback={user.displayName[0]} />
                                )}
                                <div>
                                    <h1>{user?.displayName}</h1>
                                    <small>{user.email}</small>
                                    <ul>
                                        <li>Favoritos ({myListAnimes.length})</li>
                                        <li>Animes assistidos ({watchedAnimes.length})</li>
                                    </ul>
                                </div>
                            </div>                        
                        </div>
                </section>
                <section className={style.profile__animes}>
                    <div className={style.profile__countanimes}>
                        <h1>Animes</h1>
                        <ul>
                            <li>Favoritos ({myListAnimes.length})</li>
                            <li>Assistidos</li>
                        </ul>
                    </div>
                    <div className={style.profile__animes_container}>
                        { myListAnimesLoading || myListAnimesFetching
                        ? (
                            createRangeArrayByNumber(myListAnimes.length).map((item: any) => (<Skeleton key={item} width={210} height={305} />))
                        ) : myListAnimesError 
                        ? (
                            
                            <div className={style.profile__animes_errorMessage}>
                                <span>Vixii!</span>
                                <strong>Alguma coisa deu errado em buscar seus animes favorito!</strong>
                                <strong>:(</strong>

                            </div>
                        ) :  myListAnimesData 
                        ? (
                            myListAnimesData.map(anime => (
                                <CardAnime key={anime.slug} anime={anime} />
                            ))
                        ): (
                            <p>Lista vazia</p>
                        )}                      
                    </div>
                </section>
                </>
            )}
        </main>
    )
}