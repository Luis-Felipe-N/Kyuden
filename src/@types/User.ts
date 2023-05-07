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
    watchedEpisodes: [];
    watchedAnimes: [];
    myListAnimes: [];
    myListfriends: [];
    watchingEpisodes: {
        assistedTime: number;
        id: string
    }[];
    banner: string | null;
    avatar: string | null;
}