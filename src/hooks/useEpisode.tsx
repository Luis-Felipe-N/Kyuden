import { IEpisodesAnime } from "../@types/Anime";

export function useEpisode() {

    function getNextEpisode(episodes: IEpisodesAnime[], currentEpisode: IEpisodesAnime) {
        const indexCurrentEp = episodes.findIndex((ep => currentEpisode.id == ep.id))

        if (indexCurrentEp >= (episodes.length -1)) {
            return
        }

        return episodes[indexCurrentEp + 1]
    }


    return {
        getNextEpisode
    }
}