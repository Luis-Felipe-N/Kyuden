import { IEpisodesAnime } from "../@types/Anime";

export function useEpisode() {

    function getNextEpisode(episodes: IEpisodesAnime[], currentEpisode: IEpisodesAnime) {
        const indexCurrentEp = episodes.findIndex((ep => currentEpisode.id == ep.id))

        if (indexCurrentEp >= (episodes.length -1)) {
<<<<<<< HEAD
            return
        }

        return episodes[indexCurrentEp + 1]
=======
            return null
        }

        return episodes[indexCurrentEp + 1].id
>>>>>>> 91e0b26dd14befebaf5fd5e617dc93f735ac6f93
    }


    return {
        getNextEpisode
    }
}