// Nome, data de criação, usuário que quer criar
import { onValue, ref, set, update, getDatabase } from "firebase/database"
import { IProviderUserInfo, IUser } from "../@types/User"
import { db } from "../libs/firebase";

interface IUpdateUserData {
    displayName?: string;
    avatar?: string;
    banner?: string;
    watchedEpisodes?: {};
    watchedAnimes?: {};
    myListAnimes?: {};
    myListfriends?: {};
    watchingEpisodes?: {};
}

let userData: IUser | null;

export function createUser(providerUserInfo: IProviderUserInfo){
    const createdAt = new Date().toString()
    const db = getDatabase();
    
    set(ref(db, 'users/' + providerUserInfo.id), {
        uid: providerUserInfo.id,
        email: providerUserInfo.email,
        displayName: providerUserInfo.displayName,
        createAt: createdAt,
        watchedEpisodes: {
            
        },
        watchedAnimes: {
            
        },
        myListAnimes: {
            
        },
        myListfriends: {
            
        },
        banner: "",
        avatar: ""
    });
}

export async function getUserData(userId: string, setUser: (userData: IUser) => void) {

    const unsubscribe = onValue(ref(db, 'users/' + userId), (snapshot) => {
        const userData: IUser = snapshot.val()

        console.log(userData)
        setUser(userData)

        return () => unsubscribe()
    })
    

}

export async function updateUserData(userId: string, userData: IUpdateUserData): Promise<void | Error>{
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);

    return await update(userRef, userData)
    .then(() => {})
    .catch((err) => new Error(err))
}