import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { useEpisode } from "../../../../../hooks/useEpisode";
import { useVideo } from "../../../../../hooks/useVideo";
import { api } from "../../../../../service/api";

import style from './style.module.scss'

function ButtonPassEpisodeElement() {
    const { playerState, episode, videoEl } = useVideo()
    const { getNextEpisode } = useEpisode()

    const { push } = useRouter()

    const nextEpisode = useCallback(async () => {
        if (!episode.season_id) return

        const { data } = await api.get(`animes/season/${episode.season_id}/episodes/`)
        console.log(data.episodes)
        if (!data.episodes) return

        const nextEp = getNextEpisode(data.episodes, episode)

        if (!nextEp)  return

        push(`${nextEp.id}`)
        
    }, [episode, getNextEpisode, push])

    if (playerState.durationTime - playerState.currentTime <= 200) return (
        <button className={style.btnPassEpisode} onClick={nextEpisode}>
            Próximo episódio
            <FaPlay />
        </button>
    )
    
    return null
}

export const ButtonPassEpisode = memo(ButtonPassEpisodeElement)