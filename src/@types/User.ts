export interface IProviderUserInfo {
    id: string;
    displayName: string;
    email: string;
    providerId: string;
}

export interface IUser {
    uid: string;
    email: string;
    displayName: string;
    createAt: string;
    watchedEpisodes: any | [];
    watchedAnimes: any | [];
    myListAnimes: any | [];
    myListfriends: any | [];
    banner: string | null;
    avatar: string | null;
}