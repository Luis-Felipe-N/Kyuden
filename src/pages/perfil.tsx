import { useEffect, useState } from "react"
import { IUser } from "../@types/User"
import { Avatar } from "../components/Avatar"
import { Loading } from "../components/Loading"
import { useAuth } from "../hooks/useAuth"
import { getUserData } from "../service/firebase"

import style from "../styles/Profile.module.scss"

export default function Perfil() {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState<IUser>()
    const {user} = useAuth()

    useEffect(() => {
        console.log(user)
        if(!!user) {
            setLoading(true)
            getUserData(user.uid, setUserData)
        }
        setLoading(false)
    }, [user, user?.uid])

    return (
        <main className={style.profile}>
            { loading ? (
                <Loading />
            ) : !userData ? (
                <p>User nao encontrado</p>
            ) : (
            <section>
                <div className={style.profile__banner} style={{backgroundImage: `linear-gradient(180deg, rgba(23,25,35,.6) 0%, rgba(23,25,35,9) 98%), url(${userData.banner})`}}>
                    <button>Editar</button>
                    <div>
                        {userData?.avatar ? (
                            <Avatar className={style.profile__banner_avatar} src={userData?.avatar} fallback={userData.displayName[0]} />
                        ) : (
                            <Avatar className={style.profile__banner_avatar} fallback={userData.displayName[0]} />
                        )}
                        <div>
                            <h1>{userData?.displayName}</h1>
                            <ul>
                                <li>Minha Lista ({userData.myListAnimes ? (Object.entries(userData.myListAnimes).length) : 0})</li>
                                <li>Animes assistidos ({userData.watchedAnimes ? (Object.entries(userData.watchedAnimes).length) : 0})</li>
                                <li>Episódios assistidos ({userData.watchedEpisodes ? (Object.entries(userData.watchedEpisodes).length) : 0})</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Animes</h1>
                    <ul>
                        <li>Minha Lista</li>
                        <li>Assistidos</li>
                    </ul>
                </div>
            </section>
            )}
        </main>
    )
}