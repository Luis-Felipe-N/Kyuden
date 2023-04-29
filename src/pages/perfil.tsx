import { useEffect, useState } from "react"
import { IUser } from "../@types/User"
import { useAuth } from "../hooks/useAuth"
import { getUserData } from "../service/firebase"

export default function Perfil() {
    const [userData, setUserData] = useState<IUser>()
    const {user} = useAuth()

    useEffect(() => {
        if(!!user) {
            console.log(user)
            getUserData(user.uid, setUserData)

            console.log(userData)
        }
    }, [user?.uid])

    useEffect(() => {
    }, [userData])

    return (
        <main>
            {!!userData ? (
                <section>
                    <div>
                        {userData.avatar ? (
                            <img 
                                src={userData.avatar} 
                                alt={`Avatar do usuario ${userData.displayName}`} />
                        ) : (
                            <p>Sem foto</p>
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
                    <div>
                        <h1>Animes</h1>
                        <ul>
                            <li>Minha Lista</li>
                            <li>Assistidos</li>
                        </ul>
                    </div>
                </section>
            ) : (
                <p>User nao encontrado</p>
            )}
        </main>
    )
}