// Nome, data de criação, usuário que quer criar
import { onValue, push, ref, set, update, remove, getDatabase } from "firebase/database"
import { IProviderUserInfo, IUser } from "../@types/User"
import { db } from "../libs/firebase"

export function createUser(providerUserInfo: IProviderUserInfo){
    const createdAt = new Date().toString()
    const db = getDatabase();
    
    set(ref(db, 'users/' + providerUserInfo.id), {
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

export function getUserData(userId: string, setUserData: any){
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
    const data = snapshot.val();
        setUserData(data);
    });
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