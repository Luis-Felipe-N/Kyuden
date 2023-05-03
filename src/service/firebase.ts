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
    const db = getDatabase();
    const snapshot = await get(ref(db, 'users/' + userId));
    console.log(snapshot)
    return snapshot.val();
}

export async function updateUserData(userId: string, userData: IUpdateUserData): Promise<void | Error>{
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);

    return await update(userRef, userData)
    .then(() => {})
    .catch((err) => new Error(err))
}



// export function addWatchedAnimes(userId: string, epido){
//     const createdAt = new Date().toString()
//     const db = getDatabase();
    
//     set(ref(db, 'users/' + providerUserInfo.id), {
//         email: providerUserInfo.email,
//         displayName: providerUserInfo.displayName,
//         createAt: createdAt,
//         watchedEpisodes: {
            
//         },
//         watchedAnimes: {
            
//         },
//         myListAnimes: {
            
//         },
//         myListfriends: {
            
//         },
//         banner: "",
//         avatar: ""
//     });
// }