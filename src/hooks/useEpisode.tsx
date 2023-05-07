import { useMemo } from "react";
import { IEpisodesAnime } from "../@types/Anime";
import { IProviderUserInfo, IUser } from "../@types/User";

interface IWatchedEpisodeData {
    id: string;
    assistedTime: number;
}

// [1: index, {id: string, assistedTime: string}: object]
type IWatchedEpisodeDataFirebase = (IWatchedEpisodeData | any)[]

export function useEpisode() {

    function getNextEpisode(episodes: IEpisodesAnime[], currentEpisode: IEpisodesAnime) {
        const indexCurrentEp = episodes.findIndex((ep => currentEpisode.id == ep.id))

        if (indexCurrentEp >= (episodes.length -1)) {
            return
        }

        return episodes[indexCurrentEp + 1]
    }

    function getWatchedEpisodeData(user: IUser, episode: IEpisodesAnime): IWatchedEpisodeData | undefined {
        if (!user?.watchedEpisodes) return
        const watchingEpisodes: IWatchedEpisodeDataFirebase[] = Object.entries(user.watchingEpisodes)
        const watchedEpisode: IWatchedEpisodeDataFirebase | undefined = watchingEpisodes.find(([is, value]) => value.id === episode.id) 

        return watchedEpisode ? watchedEpisode[1] : undefined
    }

    return {
        getNextEpisode,
        getWatchedEpisodeData
    }
}