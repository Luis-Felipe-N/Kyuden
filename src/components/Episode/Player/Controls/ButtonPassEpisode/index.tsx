import { useRouter } from 'next/router'
import { memo, useCallback } from 'react'
import { FaPlay } from 'react-icons/fa'
import { useEpisode } from '../../../../../hooks/useEpisode'
import { useVideo } from '../../../../../hooks/useVideo'
import { api } from '../../../../../service/api'

import style from './style.module.scss'
import { Button } from '../../../../Button'

function ButtonPassEpisodeElement() {
  const { playerState, episode } = useVideo()
  const { getNextEpisode } = useEpisode()
  const { push } = useRouter()

  const nextEpisode = useCallback(async () => {
    if (!episode.season_id) return

    const { data } = await api.get(
      `animes/season/${episode.season_id}/episodes/`,
    )

    if (!data.episodes) return

    const nextEp = getNextEpisode(data.episodes, episode)

    console.log(nextEp)

    if (!nextEp) return

    push(`${nextEp.id}`)
  }, [episode, getNextEpisode, push])

  const OneMinuteLeft = playerState.durationTime - playerState.currentTime <= 60

  if (OneMinuteLeft && playerState.durationTime > 0)
    return (
      <Button className={style.btnPassEpisode} onClick={nextEpisode}>
        Próximo episódio
        <FaPlay />
      </Button>
    )

  return null
}

export const ButtonPassEpisode = memo(ButtonPassEpisodeElement)
