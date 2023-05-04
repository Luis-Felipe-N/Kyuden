// Nome, data de criação, usuário que quer criar
import { onValue, push, ref, set, update, getDatabase, child, get } from "firebase/database"
import { string } from "yup";
import { IProviderUserInfo, IUser } from "../@types/User"

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

export async function getUserData(userId: string): Promise<IUser | null> {
    console.log("USER ID: ", userId)
    const db = getDatabase();
    const unsubscribe = onValue(ref(db, 'users/' + userId), (snapshot) => {
        userData = snapshot.val();
        return () => unsubscribe()
    })

    console.log("USER ID: ", userData)

    return userData;
}

export async function updateUserData(userId: string, userData: IUpdateUserData): Promise<void | Error>{
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);

    return await update(userRef, userData)
    .then(() => {})
    .catch((err) => new Error(err))
}