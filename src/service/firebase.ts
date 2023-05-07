// Nome, data de criação, usuário que quer criar
import { onValue, ref, set, update, getDatabase, get, child } from "firebase/database"
import { IComment, IProviderUserInfo, IUser } from "../@types/User"
import { db } from "../libs/firebase";
import { v4 as uuidV4 } from 'uuid'


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

export async function getUserData(userId: string, setUser: (userData: IUser) => void) {

    const unsubscribe = onValue(ref(db, 'users/' + userId), (snapshot) => {
        const userData: IUser = snapshot.val()
        
        setUser(userData)

        return () => unsubscribe()
    })
}

export async function updateUserData(userId: string, userData: IUpdateUserData): Promise<void | Error>{
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);

    console.log(userData)

    return await update(userRef, userData)
}

export function addCommentEpisode(userId: string, episodeId: string, text: string){
    const createdAt = new Date().getTime()
    const db = getDatabase();
    
    return set(ref(db, `comments/episodes/${episodeId}/`  + uuidV4()), {
        episodeId,
        userId,
        comment: text,
        createdAt
    });
}

export async function getCommentsEpisode(episodeId: string): Promise<IComment[]> {
    const snapshot = await get(ref(db, `comments/episodes/${episodeId}/`))
    const comments: IComment[] = snapshot.val()
    const commentsFormated = comments ? Object.entries(comments).map(([key, comment]) => {
        return {
            ...comment, 
            id: key
        }
    }).sort((a, b) => a.createdAt > b.createdAt ? 1 : (b.createdAt > a.createdAt ? 1 : 0)) : []
    return commentsFormated
}